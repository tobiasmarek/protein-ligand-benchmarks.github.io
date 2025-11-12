import json
import os
from pathlib import Path

from method_results import EnergyCalc


DATASETS_ROOT = Path(__file__).resolve().parent


def _load_reference_values(reference_energies):
    if not reference_energies:
        raise ValueError("Each dataset must define non-empty referenceEnergies.")
    return [float(value) for value in reference_energies]


def _mean_absolute(values):
    return sum(abs(value) for value in values) / len(values)


def _load_method_table(file_path):
    values = []
    with open(file_path, "r", encoding="utf-8") as handle:
        for line in handle:
            stripped = line.strip()
            if not stripped or stripped.startswith("#"):
                continue
            parts = stripped.split()
            try:
                values.append(float(parts[-1]))
            except ValueError:
                continue
    return values


def _compute_stats(values, reference_values):
    if len(values) != len(reference_values):
        raise ValueError("Calculated energies must match reference length.")
    avg_error = sum(abs(calc - ref) for calc, ref in zip(values, reference_values)) / len(reference_values)
    percent_error = (avg_error / _mean_absolute(reference_values)) * 100.0
    return round(percent_error, 3), round(avg_error, 3)


def _parse_method_folder(folder_path, reference_values):
    json_path = folder_path / "method.json"
    if not json_path.exists():
        return None
    with open(json_path, "r", encoding="utf-8") as handle:
        method_meta = json.load(handle)

    data_file = None
    for file in folder_path.iterdir():
        if file.suffix.lower() == ".txt":
            data_file = file
            break

    if data_file is None:
        return None

    values = _load_method_table(data_file)
    percent_error, raw_error = _compute_stats(values, reference_values)
    method_entry = dict(method_meta)
    method_entry["percentError"] = percent_error
    method_entry["rawError"] = raw_error
    return method_entry


def _load_computed_methods(dataset_cfg, reference_values):
    computed_methods = []
    for computed in dataset_cfg.get("computedMethods", []):
        ctype = computed.get("type")
        if ctype == "torchani":
            dataset_name = computed.get("dataset") or dataset_cfg.get("id")
            try:
                ani_values = EnergyCalc.giveEnergy(dataset_name)
            except Exception as exc:
                print(f"Skipping TorchANI data for dataset '{dataset_name}': {exc}")
                continue
            percent_error, raw_error = _compute_stats(ani_values, reference_values)
            entry = {key: value for key, value in computed.items() if key not in {"type", "dataset"}}
            entry["percentError"] = percent_error
            entry["rawError"] = raw_error
            computed_methods.append(entry)
    return computed_methods


def _iter_dataset_directories():
    for item in DATASETS_ROOT.iterdir():
        if not item.is_dir():
            continue
        config_path = item / "dataset.json"
        methods_path = item / "methods"
        if config_path.exists() and methods_path.exists():
            yield item, config_path, methods_path


def _build_dataset_payload(dataset_dir, config_path, methods_path):
    with open(config_path, "r", encoding="utf-8") as cfg:
        dataset_cfg = json.load(cfg)

    reference_values = _load_reference_values(dataset_cfg.get("referenceEnergies", []))
    dataset_entry = {
        "id": dataset_cfg.get("id", dataset_dir.name.lower()),
        "label": dataset_cfg.get("label", dataset_dir.name),
        "title": dataset_cfg.get("title", dataset_cfg.get("label", dataset_dir.name)),
        "chartTitle": dataset_cfg.get("chartTitle"),
        "description": dataset_cfg.get("description", []),
        "showVideo": dataset_cfg.get("showVideo", False),
        "methods": [],
    }

    folders = sorted(
        [
            child
            for child in methods_path.iterdir()
            if child.is_dir() and not child.name.startswith(".")
        ],
        key=lambda path: path.name.lower(),
    )

    for folder in folders:
        parsed = _parse_method_folder(folder, reference_values)
        if parsed:
            dataset_entry["methods"].append(parsed)

    dataset_entry["methods"].extend(_load_computed_methods(dataset_cfg, reference_values))
    return dataset_entry


def giveData():
    datasets = []
    for dataset_dir, config_path, methods_path in _iter_dataset_directories():
        try:
            datasets.append(_build_dataset_payload(dataset_dir, config_path, methods_path))
        except Exception as exc:
            print(f"Failed to parse dataset '{dataset_dir.name}': {exc}")
            raise
    datasets.sort(key=lambda item: item["label"].lower())
    return {"datasets": datasets}
