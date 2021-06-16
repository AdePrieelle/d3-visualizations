import * as d3 from 'd3';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };

export const Marks = ({ 
  binnedData, 
  xScale, 
  yScale, 
  tooltipFormat, 
  innerHeight
}) => {
  return (
    binnedData.map((d, id) => (
      <rect 
        className="mark"
        key={id}
        x={xScale(d.x0)} 
        y={yScale(d.y)} 
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.y)}
      >
        <title>{tooltipFormat(d.y)}</title>
      </rect>
    ))
  )
}

export const DateHistogram = ({ data }) => {

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
    <g transform={`translate(${margin.left},${margin.top})`}>
      <Marks 
        binnedData={binnedData} 
        xScale={xScale} 
        yScale={yScale} 
        tooltipFormat={d => d}
        circleRadius={2}
        innerHeight={innerHeight}
      />
    </g>
  )
};