import * as d3 from 'd3';
export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius }) => {
  return (
    <g className="marks">
      <path 
        className="marks-area"
        d={d3.area()
          .x(d => xScale(xValue(d)))
          // .y0(innerHeight);
          .y0(yScale(0))
          .y1(d => yScale(yValue(d)))
          // .curve(d3.curveNatural)
          .curve(d3.curveStepAfter)
          (data)}
      />
      <path
        className="marks-line"
        d={d3.line()
          .x(d => xScale(xValue(d)))
          .y(d => yScale(yValue(d)))
          // .curve(d3.curveNatural)
          .curve(d3.curveStepAfter)
          (data)}
      />
      {/* {
        data.map((d, id) => (
        <circle 
          key={id}
          cx={xScale(xValue(d))} 
          cy={yScale(yValue(d))} 
          r={circleRadius}
        >
          <title>
            Time: {tooltipFormat(xValue(d)) + '\n'}
            Precipitation: {yValue(d)}
          </title>
        </circle>
        ))
      } */}
    </g>
  )
}
