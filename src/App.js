import Chart from "chart.js/auto";
import React, { useEffect, useMemo, useState } from "react";
import { CategoryScale } from "chart.js";
import { BarChart } from "./components/BarChart.js";
import "./App.css";
import Video from "./components/Video.js";
import Table from "./components/Table.js";
import logo from "./github-mark.png";

Chart.register(CategoryScale);

const columns = ["name", "category", "description", "references", "code", "percentError", "rawError"];

export default function App() {
  const [datasets, setDatasets] = useState([]);
  const [activeDatasetId, setActiveDatasetId] = useState(null);
  const [chartMetric, setChartMetric] = useState("percent");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [options, setOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          font: { size: 17 },
          display: true,
          text: "Method",
        },
        ticks: { font: { size: 15 } },
      },
      y: {
        ticks: {
          font: { size: 15 },
          callback: function (value) {
            return value;
          },
        },
        title: {
          font: { size: 17 },
          display: true,
          text: "Relative Error (%)",
        },
      },
    },
  });
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    fetch("/data.json?v=" + Date.now(), {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const datasetList = data.datasets || [];
        setDatasets(datasetList);
        if (datasetList.length) {
          setActiveDatasetId((prev) => prev || datasetList[0].id);
        }
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  const colors = useMemo(() => {
    return {
      SQM: "rgba(240, 130, 130, 1)",
      ML: "rgba(160, 221, 241, 1)",
      "SQM+ML": "#86fab6ff",
      default: "#fdfeffff",
    };
  }, []);

  const activeDataset = useMemo(
    () => datasets.find((dataset) => dataset.id === activeDatasetId),
    [datasets, activeDatasetId]
  );

  const modelData = useMemo(() => activeDataset?.methods ?? [], [activeDataset]);

  useEffect(() => {
    if (!modelData.length) {
      setChartData({ labels: [], datasets: [] });
      return;
    }

    const isPercentMetric = chartMetric === "percent";
    const metricLabel = isPercentMetric ? "Relative error (%)" : "Mean Unsigned Error (kcal/mol)";
    const metricKey = isPercentMetric ? "percentError" : "rawError";

    setChartData({
      labels: modelData.map((data) => data.name),
      datasets: [
        {
          label: metricLabel,
          data: modelData.map((data) => data[metricKey]),
          backgroundColor: modelData.map((data) => colors[data.category] || colors.default),
        },
      ],
    });

    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            font: { size: 17 },
            display: true,
            text: "Method",
          },
          ticks: { font: { size: 15 } },
        },
        y: {
          ticks: {
            font: { size: 15 },
            callback: function (value) {
              return value;
            },
          },
          title: {
            font: { size: 17 },
            display: true,
            text: isPercentMetric ? "Relative Error (%)" : "Mean Unsigned Error (kcal/mol)",
          },
        },
      },
    });
  }, [modelData, colors, chartMetric]);

  function handleTable() {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);
  }

  const headerTitle =
    activeDataset?.title || "Protein-ligand interaction energy benchmarks";

  return (
    <div className="App">
      <h1 className="header1">
        <div className="header-text">
          <strong>{headerTitle}</strong>
        </div>
        <a
          className="logo"
          href="https://github.com/protein-ligand-benchmarks/protein-ligand-benchmarks.github.io"
          target="_blank"
          rel="noreferrer"
        >
          <img className="gh-logo-icon" src={logo} alt="Source at GitHub" />
        </a>
      </h1>

      {datasets.length > 1 && (
        <div className="dataset-tabs" role="tablist">
          {datasets.map((dataset) => (
            <button
              key={dataset.id}
              role="tab"
              aria-selected={dataset.id === activeDatasetId}
              className={`dataset-tab ${
                dataset.id === activeDatasetId ? "dataset-tab-active" : ""
              }`}
              onClick={() => {
                setActiveDatasetId(dataset.id);
                setChartMetric("percent");
              }}
            >
              {dataset.label}
            </button>
          ))}
        </div>
      )}

      <div className="contain1">
        <div className="chart-container">
          <div className="chart1">
            <BarChart
              chartData={chartData}
              options={options}
              title={activeDataset?.chartTitle}
            />
          </div>
          <div className="buttonContainer">
            The Mean Unsigned Error can be displayed as{" "}
            <button
              className="buttonP"
              onClick={() => setChartMetric("percent")}
              disabled={chartMetric === "percent"}
            >
              percentage of the interaction energy
            </button>{" "}
            or in{" "}
            <button
              className="buttonP"
              onClick={() => setChartMetric("raw")}
              disabled={chartMetric === "raw"}
            >
              kcal/mol
            </button>
          </div>
          <div className="Table">
            <div className="table-note-text">
              <br /> *Please select either accuracy or category to sort by.*
            </div>
            <br />
            <div>
              <div className={`box ${isAnimating ? "animate" : ""}`}>
                <Table
                  className="Tablemain"
                  columns={columns}
                  modelData={modelData}
                  func={() => handleTable()}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="BP1">
          <div className="Inner-Text">
            {(activeDataset?.description || []).map((paragraph, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
            {activeDataset?.showVideo && <Video />}
          </div>
        </div>
      </div>

      <div className="ending">
        <p>
          Built by <a href="https://github.com/Danielk5924">Daniel Konvicka</a>{" "}
          during his internship in{" "}
          <a href="https://rezac.group.uochb.cz/en">Jan Řezáč group</a> at{" "}
          <a href="https://www.uochb.cz/en">IOCB Prague</a>
        </p>
        <p>
          Extended by <a href="https://github.com/tobiasmarek">Marek Tobiáš</a>{" "}
        </p>
      </div>
    </div>
  );
}
