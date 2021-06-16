// export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) => {
//   return (
//     xScale.domain().map((tickValue) => (
//       <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
//         <line y2={innerHeight} />
//         <text 
//           style={{textAnchor: 'middle'}} 
//           dy=".71em"
//           y={innerHeight + tickOffset}
//         >
//           {tickFormat(tickValue)}
//         </text>
//       </g>
//     ))
//   )
// }

import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export const AxisBottom = ({ xScale, innerHeight, innerWidth, tickFormat }) => {
  const ref = useRef();
  useEffect(() => {
    const xAxisG = d3.select(ref.current);
    const xAxis = d3.axisBottom(xScale)
      .tickSize(innerHeight)
      .tickPadding(10)
      .tickFormat(d3.timeFormat("%H:%M"))
      .tickValues(xScale.domain().filter(function(d){ 
        const xAxisTimeFormat = d3.timeFormat("%H:%M")(d);
        return (
          xAxisTimeFormat.slice(-1) === "0" 
          ? xAxisTimeFormat 
          : xAxisTimeFormat.slice(-1) === "5" 
          ? xAxisTimeFormat 
          : null
        )
        // return (
        //   xAxisTimeFormat.slice(-2) === "00" 
        //   ? xAxisTimeFormat 
        //   : xAxisTimeFormat.slice(-2) === "15" 
        //   ? xAxisTimeFormat 
        //   : xAxisTimeFormat.slice(-2) === "30" 
        //   ? xAxisTimeFormat 
        //   : xAxisTimeFormat.slice(-2) === "45" 
        //   ? xAxisTimeFormat 
        //   : null
        // )
      }));
    xAxisG.call(xAxis);
  }, [xScale, innerHeight]);
  
  return (
    <g ref={ref} />
  );
};
