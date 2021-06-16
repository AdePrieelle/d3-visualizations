import * as d3 from 'd3';
export const Marks = ({ data, xScale, yScale, xValue, yValue, innerHeight, tooltipFormat, circleRadius }) => {
  return (
    // <g className="marks">
    //   <path 
    //     className="marks-area"
    //     d={d3.area()
    //       .x(d => xScale(xValue(d)))
    //       .y0(yScale(0))
    //       .y1(d => yScale(yValue(d)))
    //       // .curve(d3.curveNatural)
    //       (data)}
    //   />
    //   <path
    //     className="marks-line"
    //     d={d3.line()
    //       .x(d => xScale(xValue(d)))
    //       .y(d => yScale(yValue(d)))
    //       // .curve(d3.curveNatural)
    //       (data)}
    //   />
    //   {
    //     data.map((d, id) => (
    //     <circle 
    //       key={id}
    //       cx={xScale(xValue(d))} 
    //       cy={yScale(yValue(d))} 
    //       r={circleRadius}
    //     >
    //       <title>
    //         Time: {tooltipFormat(xValue(d)) + '\n'}
    //         Precipitation: {yValue(d)}
    //       </title>
    //     </circle>
    //     ))
    //   }
    // </g>
    <g>
      {data.map((d) => (
        <rect 
          className="mark"
          key={xValue(d)}
          y={yScale(yValue(d))} 
          x={xScale(xValue(d))} 
          height={innerHeight - yScale(yValue(d))}
          width={xScale.bandwidth()}
          fill="rgba(12, 162, 248, 0.659)"
        >
          <title>
            {`Time: ${tooltipFormat(xValue(d))}`}
            {'\n'}
            {`Precipitation: ${yValue(d).toFixed(2)}`}
          </title>
        </rect>
      ))}
    </g>
  )
}
