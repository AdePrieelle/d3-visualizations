// Polished Scatter Plot with Menus (with React and D3)
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { Dropdown } from './Dropdown';
import ReactDropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './PolishedScatterPlotWithMenus.css';

console.log(ReactDropdown);

const width = 960;
const menuHeight = 80;
const height = 500 - menuHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const attributes = [ 
  { value: "sepal_length", label: 'Sepal Length' }, 
  { value: "sepal_width", label: 'Sepal Width' }, 
  { value: "petal_length", label: 'Petal Length' }, 
  { value: "petal_width", label: 'Petal Width' }, 
  { value: "species", label: 'Species' }
];

const getLabel = value => {
  for(let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
}

export const PolishedScatterPlotWithMenus = () => {
  const data = useData();
  
  const initialXAttribute = 'petal_length';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = 'sepal_width';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  if(!data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  console.log(data[0]);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const siFormat = d3.format(".2s");
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight]);

  return (
    <>
      <div className="menus-container">
        <span className="dropdown-label">X</span>
        <ReactDropdown 
          options={attributes} 
          value={xAttribute}
          onChange={({value}) => setXAttribute(value)}
        />
        <span className="dropdown-label">Y</span>
        <ReactDropdown 
          options={attributes} 
          value={yAttribute}
          onChange={({value}) => setYAttribute(value)}
        />
      </div>
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
          <Marks 
            data={data} 
            xScale={xScale} 
            yScale={yScale} 
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={7}
          />
        </g>
      </svg>
    </>
  );
};