import * as d3 from 'd3';

const xValue = d => d.date;
const yValue = d => d.deathTotal;

export const LineChart = ({ data, width, height }) => {
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([height, 0]);

  const lineGenerator = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)));

  return (
    <svg width={width} height={height}>
      <path d={lineGenerator(data)} />
    </svg>
  )
};
