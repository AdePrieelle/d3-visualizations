import * as d3 from 'd3';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const margin = { top: 0, right: 30, bottom: 20, left: 45 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;

export const DateHistogram = ({ data, width, height }) => {

  const xValue = d => d['Reported Date'];
  const xAxisLabel = 'Time';

  const yValue = d => d['Total Dead and Missing'];
  const yAxisLabel = 'Total Dead and Missing';


  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xAxisTickFormat = d3.timeFormat("%m/%d/%Y");
  

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = d3.bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(d3.timeMonths(start, stop))
    (data)
    .map(array => ({
      y: d3.sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }));

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(binnedData, d => d.y)])
    .range([innerHeight, 0]);

  
  return (
    <>
      <rect width={width} height={height} fill='white' />
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
          binnedData={binnedData} 
          xScale={xScale} 
          yScale={yScale} 
          tooltipFormat={d => d}
          circleRadius={2}
          innerHeight={innerHeight}
        />
      </g>
    </>
  )
};
