import './Table.css';
import React from 'react';
import { useState } from 'react';



export default function Table({columns, modelData, func}){

let rawData = [...modelData]; //This makes a copy of modelData, if you had done rawData=modelaData it would have altered model Data whenever you change rawData
var [sortOn, setsortOn] = useState();
var holder = null;
  
if (sortOn !== null || sortOn !== holder){
      holder = sortOn;
    rawData.sort((a, b) => {
      if (a[sortOn] < b[sortOn]) {  
        return 1;
      }
      if (a[sortOn] > b[sortOn]) {
        return -1;
      }
      return 0;
    });
  }
  

  return (
        <table className="table" >
    <thead className ="header">
      <tr>
        {columns.map((col) => { if (col === "accuracy" || col === "category"){ return(
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
        <tr key={idx}>
          {columns.map((col) => (
            <td className = "cell" key={col}>
              { 
              ((col === "code" || col === "references") && Array.isArray(row[col]))? 
                row[col].map((url, idx) => (
                  <a key = {idx} href={url} target="_blank" rel="noreferrer">Link</a>
                )) 
                : (col === "accuracy") ? (row[col].toFixed(2) +"%")
                : (typeof row[col] === "object" && row[col] !== null)? (JSON.stringify(row[col])):(
                row[col])
              }
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>

  );

 
}
