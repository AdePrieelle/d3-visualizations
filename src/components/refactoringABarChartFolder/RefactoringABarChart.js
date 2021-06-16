// Refactoring a Bar Chart (with React and D3)
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

export const RefactoringABarChart = () => {
  const data = useData();

  if(!data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  console.log(data[0]);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = d => d.Country;
  const xValue = d => d.Population;

  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight]);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight}/>
        <AxisLeft yScale={yScale} />
        <Marks 
          data={data} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};