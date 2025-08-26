import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData, options }) => {

  return (
    <div className="chart-container" style={{opacity: "100%", background:"white"}}>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Error of tested methods in the PLA15 data set"
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
