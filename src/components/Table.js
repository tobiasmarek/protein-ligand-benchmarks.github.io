import './Table.css';
import React from 'react';
import { useState, useEffect } from 'react'


export default function Table({columns, modelData, sortOn}){

let rawData = [...modelData]; //This makes a copy of modelData, if you had done rawData=modelaData it would have altered model Data whenever you change rawData
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
        <table className="table" style={{borderRadius:"5px", border:"10px solid black", boxShadow:"2 5px 6px rgba(0, 0, 0, 0.1)"}}>
    <thead className ="header">
      <tr>
        {columns.map((col) => (
          <th key={col}>
            {col}
            </th>
        ))}
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
                  <a key = {idx} href={url} target="_blank">Link</a>
                )) : typeof row[col] === "object" && row[col] !== null? (JSON.stringify(row[col])):(
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