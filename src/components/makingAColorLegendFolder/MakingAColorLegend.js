// Making a Color Legend, Scatter Plot (with React and D3)
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import './MakingAColorLegend.css';
import { ColorLegend } from './ColorLegend';

const width = 960;
const height = 500;
const margin = { top: 20, right: 200, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

export const MakingAColorLegend = () => {
  const data = useData();

  if(!data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  console.log(data[0]);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.petal_length;
  const xAxisLabel = 'Petal Length';

  const yValue = d => d.sepal_width;
  const yAxisLabel = 'Sepal Width';

  const colorValue = d => d.species;
  const colorLegendLabel = "Species";

  const circleRadius = 7;

  const siFormat = d3.format(".2s");
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = d3.scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A']);

  return (
    <svg className="svg-stylized-bar-chart" width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom 
          xScale={xScale} 
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text 
          className="axis-label" 
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft 
          yScale={yScale} 
          innerWidth={innerWidth} 
          tickOffset={5}
        />
        <text 
          className="axis-label" 
          x={innerWidth / 2} 
          y={innerHeight + xAxisLabelOffset} 
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <g className="tick" transform={`translate(${innerWidth + 60}, 60)`}>
          <text 
            x={35}
            y={-25}
            className="axis-label" 
            textAnchor="middle"
          >
            {colorLegendLabel}
          </text>
          <ColorLegend 
            colorScale={colorScale}
            tickSpacing={22} 
            tickSize={circleRadius}
            tickTextOffset={12}
          />
        </g>
        <Marks 
          data={data} 
          xScale={xScale} 
          xValue={xValue}
          yScale={yScale} 
          yValue={yValue}
          colorScale={colorScale}
          colorValue={colorValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={circleRadius}
        />
      </g>
    </svg>
  );
};