import * as d3 from 'd3';

export const Marks = ({ 
  data, 
  xScale, 
  yScale, 
  xValue, 
  yValue, 
  innerHeight
}) => {
  return (
    <g className="marks">
      <path 
        className="marks-area"
        d={d3.area()
          .x(d => xScale(xValue(d)))
          .y0(innerHeight)
          .y1(d => yScale(yValue(d)))
          .curve(d3.curveMonotoneX)
          (data)}
      />
      <path
        className="marks-line"
        d={d3.line()
          .x(d => xScale(xValue(d)))
          .y(d => yScale(yValue(d)))
          .curve(d3.curveMonotoneX)
          (data)}
      />
    </g>
  )
}
