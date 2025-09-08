import './Table.css';
import React from 'react';
import { useState } from 'react';

function Favicon({ url }) {
  const domain = new URL(url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return <img src={faviconUrl} alt="favicon" width={20} height={20} />;
} //This function should retrieve the favicon for the website using googles services

export default function Table({columns, modelData, func}){

let rawData = [...modelData]; //This makes a copy of modelData, if you had done rawData=modelaData it would have altered model Data whenever you change rawData
var [sortOn, setsortOn] = useState();
var holder = null;
  
if (sortOn !== null || sortOn !== holder){
      holder = sortOn;
    rawData.sort((a, b) => {
      if (a[sortOn] < b[sortOn]) {  
        return -1;
      }
      if (a[sortOn] > b[sortOn]) {
        return 1;
      }
      return 0;
    });
  }
  

  return (
        <table className="table" >
    <thead className ="header">
      <tr>
        {columns.map((col) => { if (col === "percentError" || col === "category"){ return(
          <th key={col}>
            <button onClick = {() => {func(col); setsortOn(col)}} className="sort-button">
            {col}
            </button>
          </th>)
        }else{
          return (
            <th key={col}>
              {col}
            </th>
          )
        }
      })}
      </tr>
    </thead>
    <tbody >
      {rawData.map((row, idx) => (
        <tr key={idx}
        className={row.category === "SQM" ? "highlight" : row.category === "ML" ? "highlight2" : row.category === "SQM+ML" ? "highlight3" : ""}
        >
          {columns.map((col) => (
            <td className = "cell" key={col}>
              { 
              ((col === "code" || col === "references") && Array.isArray(row[col]))? 
                row[col].map((url, idx) => (
                  <a key = {idx} href={url} target="_blank" rel="noreferrer"> 
                    <Favicon url={url} />
                  </a>
                )) 
                : (col === "percentError") ? (row[col].toFixed(2) +"%")
                : (typeof row[col] === "object" && row[col] !== null)? (JSON.stringify(row[col]))
                : row[col]
              }
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>

  );

 
}
