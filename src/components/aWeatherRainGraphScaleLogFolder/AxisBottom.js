// export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) => {
//   return (
//     xScale.ticks().map((tickValue) => (
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

export const AxisBottom = ({ xScale, innerHeight }) => {
  const ref = useRef();
  useEffect(() => {
    const xAxisG = d3.select(ref.current);
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .ticks(12)
      .tickFormat(d3.timeFormat("%H:%M"))
      .tickPadding(18);
    xAxisG.call(xAxis);
  }, [xScale, innerHeight]);
  
  return (
    <g transform={`translate(0,${innerHeight})`} ref={ref} />
  );
};

