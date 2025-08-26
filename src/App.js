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
  


  const columns = ["name", "category", "description", "references", "code", "accuracy"];

  var [chartData, setChartData] = useState({
    labels: backendData.map((data) => data.name),
    datasets: [
      {
        label: "Percent Error",
        data: backendData.map((data) => (100-data.accuracy) ),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "rgb(245, 175, 226)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: backendData.map((data) => data.name),
      datasets: [
        {
          label: "Percent Error ",
          data: backendData.map((data) => (100-data.accuracy)),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "rgb(245, 175, 226)",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          
        },
      ],
    });
  }, [backendData]);


  const [isAnimating, setIsAnimating] = useState(true);
  var [options, setOptions] = useState({
    responsive:true,
    scales:{
        y: {
          ticks:{
            callback: function(value) {
              return value+"%";
          }
        }
      }}});

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
      chartData.datasets[0].data[0] === backendData.map((data) => 100-data.accuracy)[0]
      ) {
      setChartData({
        labels: backendData.map((data) => data.name),
        datasets: [
          {
            label: "number of units the Calculator was incorect by in Kcal/mol",
            data: backendData.map((data) => data.rawError),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "rgb(245, 175, 226)",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            
          },
        ],
      });
    console.log("chartData");
      setOptions({
        responsive:true,
        scales:{
            y: {
              ticks:{
                callback: function(value) {
                  return value+" Kcal/Mol";
              }
            }
      }}});
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
            data: backendData.map((data) => (100-data.accuracy)),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "rgb(245, 175, 226)",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            
          },
        ],
      });
      setOptions({
    responsive:true,
    scales:{
        y: {
          ticks:{
            callback: function(value) {
              return value+"%";
          }
        }
      }}});
    }
  }

  
  

  return (
    <div className="App">
      <h1 className="header1">
        <div className="header-text">
          <strong >PLA15 Protein-ligand interaction energy benchmarks</strong>
        </div>
        <a className="logo" href="https://github.com/protein-ligand-benchmarks/protein-ligand-benchmarks.github.io" target="_blank" rel="noreferrer">
          <img style={{ width: "60px", height: "60px" }} src={logo} alt="Source at GitHub"></img>
        </a>
      </h1>

      <div className="contain1">

        <div className="chart-container">
          <BarChart className="chart1" chartData={chartData} options={options} />
          <div className="buttonContainer">
	    The Mean Unsigned Error can be displayed as
            <button className="buttonP" onClick={() => buttonHandler()}>percentage of the interaction energy</button> or in 
            <button className="buttonP" onClick={() => buttonHandler2()}>kcal/mol</button>
          </div>
          <div className="Table">
            <div style={{ color: "white" }}> <br /> *Please select either accuracy or category to sort by.*</div>
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
            Built by Daniel Konvicka during his internship in <a href="https://rezac.group.uochb.cz/en">Jan Řezáč group</a> at <a href="https://www.uochb.cz/en">IOCB Prague</a>
          </p>
        </div>

    </div>
  );
}



