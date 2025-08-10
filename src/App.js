import Chart from "chart.js/auto";
import React from "react";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { useEffect } from "react";
import { BarChart } from "./components/BarChart.js";
import "./App.css";
import Video from "./components/Video.js";
import Table from "./components/Table.js";
//import logo from "./github-mark.png";


Chart.register(CategoryScale);

export default function App() {

  const[backendData, setbackendData] = useState([]);

  useEffect(() => {
    fetch('/data.json',{
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
        label: "Percent Accuracy ",
        data: backendData.map((data) => data.accuracy ),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: backendData.map((data) => data.name),
      datasets: [
        {
          label: "Percent Accuracy ",
          data: backendData.map((data) => data.accuracy),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
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
      chartData.datasets[0].data[0] === backendData.map((data) => data.accuracy)[0]
      ) {
      setChartData({
        labels: backendData.map((data) => data.name),
        datasets: [
          {
            label: "number of units the Calculator was incorect by in Kcal/mol",
            data: backendData.map((data) => data.rawError),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
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
            label: "Percent Accuracy ",
            data: backendData.map((data) => data.accuracy),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
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
        <strong >Comparing Different Energy Calculators</strong>
        </div>
        {/* <a className="logo"  target="_blank" rel="noreferrer">
          <img style ={{width: "75px", height: "75px"}} src={logo} alt="GitHub Logo"></img>
          </a> */}
      </h1>

      <div className="contain1">

        <div className="chart-container">
          <BarChart className="chart1" chartData={chartData} options = {options} />
          <div className="buttonContainer">
          <button className="buttonP" onClick={() => buttonHandler()}>Switch to Percentage</button>
          <button className="buttonUnit" onClick={()=>buttonHandler2()}>Switch to Kcal/Mol</button>
          </div>
          <div className="Table">
          <div className="edges">
          <div className={`box ${isAnimating ? "animate" : ""}`} >
            <Table className="Tablemain" columns={columns} modelData={backendData} func= {() => handleTable()} />
          </div>
          </div>
          <div style ={{color:"white"}}> <br/> *Please select either accuracy or category to sort by.*</div>
          </div>
        </div>



        <div className="BP1">
          <div className="Inner-Text">
            <Video/>
            Welcome: {" "}
          </div>
          <br />
          This graph highlights the accuracy of interactive energy
          calculations made by an array of calculators that use machine learning(ML) 
          and/or Semiempirical Quantum Mechanical(SQM) methods. The
          button under the graph allow for toggleable units. In other words you can choose
          to display the models accuracy in percentages, or you can choose to display the models 
          average error in Kcal/Mol. The table below displays all of the calculators used, and 
          where to find their code or references. The table sorts them based on their category, 
          grouping the SQM models together, and the ML models seperately. The data on this graph 
          was found by using the calculator to predict the interaction energy for different Protein 
          and Ligand structures. Then we compared these interaction energies to the known energy of 
          the system(which was calculated using cryo EM). This gave a raw error in electron Volts(eV)
          which was then converted into Kcal/Mol and was then converteted into a percentage error. 
           <br />
          Thanks for visiting!
        </div>
      </div>

      <div className="ending">
        <p>
          <strong>Thanks for visitng!</strong><br/>
          - *Names*
        </p>
      </div>

    </div>
  );
}



