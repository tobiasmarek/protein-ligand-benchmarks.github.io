import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData, options }) => {

  return (
    <div className="chart-panel" style={{ height: "400px", width: "600px", margin: "auto"}}>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Error of tested methods in the PLA15 data set",
              font: {
                size: 40
              }
            },
            legend: {
              display: false
            }
          },
          ...options
            
          
        }}

        
      />
    </div>

  );
};
