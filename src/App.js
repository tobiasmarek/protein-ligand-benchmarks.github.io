import Chart from "chart.js/auto";
import React from "react";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { useEffect } from "react";
import { BarChart } from "./components/BarChart.js";
import "./App.css";
import Video from "./components/Video.js";
import Table from "./components/Table.js";
import logo from "./github-mark.png";
import { useMemo } from "react";


Chart.register(CategoryScale);

export default function App() {

  const[backendData, setbackendData] = useState([]);

  useEffect(() => {
    fetch('/data.json?v=' + Date.now(),{
      headers : { 
        'Accept': 'application/json'
       }
    }
    )
    .then((response) => response.json())  
    .then((data) => setbackendData(data) // Access the data as a JavaScript object
    )
    .catch(error => console.error('Error loading JSON:', error));
  }, []);

  const colors = useMemo(() => { //Saves the colors const to cache so it doesnt trigger use effect each time
    return {
      "SQM": "rgba(240, 130, 130, 1)",
      "ML": "rgba(160, 221, 241, 1)",
      "SQM+ML": "#86fab6ff",
      "default": "#fdfeffff"
    };
  }, []);
  

  const columns = ["name", "category", "description", "references", "code", "percentError", "rawError"];

  var [chartData, setChartData] = useState({
    labels: backendData.map((data) => data.name),
    datasets: [
      {
        label: "Relative error (%)",
        data: backendData.map((data) => (data.percentError) ),
        backgroundColor: backendData.map((data) =>
        colors[data.category] || colors.default
      ),
        
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: backendData.map((data) => data.name),
      datasets: [
        {
        label: "Relative error (%)",
          data: backendData.map((data) => (data.percentError)),
          backgroundColor: backendData.map((data) =>
        colors[data.category] || colors.default
      ),
          
        },
      ],
    });
  }, [backendData, colors]);


  const [isAnimating, setIsAnimating] = useState(true);
  var [options, setOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
            x: {
                title: {
                  font: {
                size: 17 
              },
                display: true,
                text: 'Method' // X-axis label
                },
                ticks: {
                  font: {
                    size: 15
                  }
                }
            },
            y: {
              ticks:{
              font: {
                size: 15 
              },
              callback: function(value) {
              return value;
          }
        },
              title: {
                font: {
                size: 17 
              },
              display: true,
              text: 'Relative Error (%)' // Y-axis label
              }
            }
        }
      });

  //state for animaiton (false is off and true is on) True origionally to show the element
  function handleTable(value){
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);
  }
  
  function buttonHandler2() {
    //This if statment checks if the first value of chartData.data(Which will be a list of
    // the values under the "data" label are equal to the first values of Data.userGain, which
    //essentialy just compares if the data displayed(chartData) is equal to the first data file (Data).
    if (
      chartData.datasets[0].data[0] === backendData.map((data) => data.percentError)[0]
      ) {
      setChartData({
        labels: backendData.map((data) => data.name),
        datasets: [
          {
            label: "Mean Unsigned Error (kcal/mol)",
            data: backendData.map((data) => data.rawError),
            backgroundColor: backendData.map((data) =>
        colors[data.category] || colors.default
      ),
            
          },
        ],
      });
    console.log("chartData");
      setOptions({
        responsive:true,
        scales: {
            x: {
                title: {
                  font: {
                size: 17 
              },
                display: true,
                text: 'Method' // X-axis label
                },
                ticks: {
                  font: {
                    size: 15
                  }
                }
            },
            y: {
              ticks:{
              font: {
                size: 15 
              },
              callback: function(value) {
              return value;
          }
        },
              title: {
                font: {
                size: 17 
              },
              display: true,
              text: 'Mean Unsigned Error (kcal/mol)' // Y-axis label
              }
            }
        }});
    }
  }

  function buttonHandler(){
    if (
      chartData.datasets[0].data[0] === backendData.map((data) => data.rawError)[0]
    ) {
      setChartData({
        labels: backendData.map((data) => data.name),
        datasets: [
          {
            label: "Percent Error ",
            data: backendData.map((data) => (data.percentError)),
            backgroundColor: backendData.map((data) =>
        colors[data.category] || colors.default
      ),
            
          },
        ],
      });
      setOptions({
    responsive:true,
    scales: {
            x: {
                title: {
                  font: {
                size: 17 
              },
                display: true,
                text: 'Method' // X-axis label
                },
                ticks: {
                  font: {
                    size: 15
                  }
                }
            },
            y: {
              ticks:{
              font: {
                size: 15 
              },
              callback: function(value) {
              return value;
          }
        },
              title: {
                font: {
                size: 17 
              },
              display: true,
              text: 'Relative Error (%)' // Y-axis label
              }
            }
        }});
    }
  }

  
  

  return (
    <div className="App">
      <h1 className="header1">
        <div className="header-text">
          <strong >PLA15 Protein-ligand interaction energy benchmarks</strong>
        </div>
        <a className="logo" href="https://github.com/protein-ligand-benchmarks/protein-ligand-benchmarks.github.io" target="_blank" rel="noreferrer">
          <img className="gh-logo-icon" src={logo} alt="Source at GitHub" />
        </a>
      </h1>

      <div className="contain1">

        <div className="chart-container">
          <div className = "chart1">
          <BarChart chartData={chartData} options={options} />
          </div>
          <div className="buttonContainer">
	    The Mean Unsigned Error can be displayed as
            <button className="buttonP" onClick={() => buttonHandler()}>percentage of the interaction energy</button> or in 
            <button className="buttonP" onClick={() => buttonHandler2()}>kcal/mol</button>
          </div>
          <div className="Table">
            <div className="table-note-text"> <br /> *Please select either accuracy or category to sort by.*</div>
            <br />
            <div >
              <div className={`box ${isAnimating ? "animate" : ""}`} >
                <Table className="Tablemain" columns={columns} modelData={backendData} func={() => handleTable()} />
              </div>
            </div>
          </div>
        </div>



        <div className="BP1">
          <div className="Inner-Text">
            <p>
              This website collects the results of approximate computational chemistry methods and machine learning potentials computed in the <a href="https://doi.org/10.1021/acs.jcim.9b01171">PLA15 benchmark data set</a>.
            </p>
            <p>
              The PLA15 dataset features 15 models of protein-ligand complexes covering the interaction of the ligand with nearby amino acid residues. The systems range in size from 280 to 580 atoms. Reference interaction energies were obtained from fragment-based DLPNO-CCSD(T) calculations and represent the most accurate benchmark available for biomolecular systems of this size.
            </p>
            <p>
              The error of the tested method is expressed as a mean unsigned error and listed in kcal/mol or in percent relative to the average magnitude of the reference interaction energy in the set. The methods are divided into three categories: semiempirical quantum-mechanical calculations (SQM), atomistic machine learning potentials (ML), and the hybrid methods combining both approaches (SQM+ML).
            </p>
            <p>
              More results can be added via the <a href="https://github.com/protein-ligand-benchmarks/protein-ligand-benchmarks.github.io">GitHub repository</a>, which also provides the PLA15 structures and a sample code performing the calculations on them. Contributions of new data are welcome!
            </p>
            <Video />
          </div>
        </div>
      </div>

        <div className="ending">
          <p>
            Built by <a href="https://github.com/Danielk5924">Daniel Konvicka</a> during his internship in <a href="https://rezac.group.uochb.cz/en">Jan Řezáč group</a> at <a href="https://www.uochb.cz/en">IOCB Prague</a>
          </p>
        </div>

    </div>
  );
}
