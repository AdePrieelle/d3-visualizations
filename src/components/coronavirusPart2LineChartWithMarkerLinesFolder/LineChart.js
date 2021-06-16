import * as d3 from 'd3';
import { YMarkerLine } from './YMarkerLine';
import { XMarkerLine } from './XMarkerLine';

const xValue = d => d.date;
const yValue = d => d.deathTotal;

const margin = { top: 40, right: 80, bottom: 50, left: 150 };

export const LineChart = ({ data, width, height }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([innerHeight, 0]);

  const lineGenerator = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)));

  const mostRecentDate = xScale.domain()[1];

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <YMarkerLine 
          value={10000} 
          yScale={yScale} 
          innerWidth={innerWidth} 
        />
        <XMarkerLine 
          value={mostRecentDate} 
          xScale={xScale} 
          innerHeight={innerHeight} 
        />
        <path d={lineGenerator(data)} />
      </g>
    </svg>
  )
};
