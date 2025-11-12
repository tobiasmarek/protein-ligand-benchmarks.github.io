import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData, options, title }) => {
  return (
    <div className="chart-panel" style={{ height: "600px", width: "800px", margin: "auto" }}>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: title || "Error of tested methods",
              font: {
                size: 16,
              },
            },
            legend: {
              display: false,
            },
          },
          ...options,
        }}
      />
    </div>
  );
};
