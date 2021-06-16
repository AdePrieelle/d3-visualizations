// Margins and Axes Making a Bar Chart with React and D3
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { csv, scaleBand, scaleLinear, max } from 'd3';

const csvUrl =
    'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';
    // "https://gist.githubusercontent.com/AdePrieelle/82f887c8cff1aafde539fe76b7f8c41a/raw/df6bff7d18ce8a248e8f75f62dbcdfa9514b867a/UN_Population_2019.csv";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

export const MarginsAndAxesMakingABarChartWithReactAndD3 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +(d['2020']);
      return d;
    }
    d3.csv(csvUrl, row).then((data) => {
      console.log("Fetching data");
      setData(data.slice(0, 10));
    });
  }, [])

  if(!data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  console.log(data[0]);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;


  const yScale = d3.scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight]);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.Population)])
    .range([0, innerWidth]);

  

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line 
              // key={id} 
              // x1={0} 
              // y1={0} 
              // x2={0} 
              y2={innerHeight} 
              stroke="black"
            />
            <text 
              style={{textAnchor: 'middle'}} 
              dy=".71em"
              y={innerHeight + 3}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map((tickValue) => (
          <text 
            key={tickValue}
            style={{textAnchor: 'end'}} 
            x={-3} 
            y={yScale(tickValue) + yScale.bandwidth() / 2}
            dy=".32em"
          >
            {tickValue}
          </text>
        ))}
        {data.map((d) => (
          <rect 
            key={d.Country}
            x={0} 
            y={yScale(d.Country)} 
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
          />
        ))}
      </g>
    </svg>
  );
};