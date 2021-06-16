import * as d3 from 'd3';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';

const xValue = d => d.date;
const yValue = d => d.deathTotal;

const margin = { top: 50, right: 40, bottom: 80, left: 100 };

export const LineChart = ({ data, width, height }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const allData = data.reduce(
    (accumulator, countryTimeseries) => accumulator.concat(countryTimeseries), 
    []
  );

  const epsilon = 1;

  const xScale = d3.scaleTime()
    .domain(d3.extent(allData, xValue))
    .range([0, innerWidth]);

  const yScale = d3.scaleLog()
    .domain([epsilon, d3.max(allData, yValue)])
    .range([innerHeight, 0]);

  const lineGenerator = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(epsilon + yValue(d)));

  const mostRecentDate = xScale.domain()[1];

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <YAxis yScale={yScale} innerWidth={innerWidth} />
        {
          data.map((countryTimeseries, id) => {
            console.log(yValue(countryTimeseries[0]));
            const r = Math.random() * 255;
            const g = Math.random() * 255;
            const b = Math.random() * 255;
            const strokeColor = `rgb(${r},${g},${b})`;
            return (
              <path 
                key={id} 
                stroke={strokeColor}
                d={lineGenerator(countryTimeseries)} 
              />
            )
          })
        }
        <text 
          transform={`translate(${innerWidth / 2},-10)`} 
          textAnchor="middle"
        >
          Coronavirus Global Deaths Over Time
        </text>
        <text 
          className="axis-label"
          transform={`translate(-40,${innerHeight / 2}) rotate(-90)`} 
          textAnchor="middle"
        >
          Cumulative Deaths
        </text>
        <text 
          className="axis-label"
          textAnchor="middle"
          dominantBaseline="hanging"
          transform={`translate(${innerWidth / 2},${innerHeight + 40})`} 
        >
          Time
        </text>
      </g>
    </svg>
  )
};
