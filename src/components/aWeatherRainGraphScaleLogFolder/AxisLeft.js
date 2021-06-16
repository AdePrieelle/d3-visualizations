export const AxisLeft= ({ yScale, innerWidth, tickOffset = 3 }) => {
  return (
    // yScale.ticks().map((tickValue) => (
    //   <g className="tick" transform={`translate(0,${yScale(tickValue)})`} key={tickValue}>
    //     <line x2={innerWidth} />
    //     <text 
    //       style={{textAnchor: 'end'}} 
    //       x={-tickOffset} 
    //       dy=".32em"
    //     >
    //       {tickValue}
    //     </text>
    //   </g>
    // ))

    // new
    <>
      <g className="tick" transform={`translate(0,${yScale(0)})`}>
        <line x2={innerWidth} />
        <text 
          style={{textAnchor: 'end'}} 
          x={-tickOffset} 
          dy=".32em"
        >
          Light rain
        </text>
      </g>
      <g className="tick" transform={`translate(0,${yScale(2.5)})`}>
        <line x2={innerWidth} />
        <text 
          style={{textAnchor: 'end'}} 
          x={-tickOffset} 
          dy=".32em"
        >
          Moderate rain
        </text>
      </g>
      {(yScale.domain()[1] > 2.5)
        ? <g className="tick" transform={`translate(0,${yScale(7.6)})`}>
            <line x2={innerWidth} />
            <text 
              style={{textAnchor: 'end'}} 
              x={-tickOffset} 
              dy=".32em"
            >
              Heavy rain
            </text>
          </g>
        : null
      }
      {(yScale.domain()[1] > 7.6)
        ? <g className="tick" transform={`translate(0,${yScale(50)})`}>
            <line x2={innerWidth} />
            <text 
              style={{textAnchor: 'end'}} 
              x={-tickOffset} 
              dy=".32em"
            >
              Violent rain
            </text>
          </g>
        : null
      }
    </>
  )
}

// import { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// export const AxisLeft = ({ yScale, innerWidth }) => {
//   const ref = useRef();
//   useEffect(() => {
//     const yAxisG = d3.select(ref.current);
//     const yAxis = d3.axisLeft(yScale)
//       .tickSize(-innerWidth)
//       .tickPadding(10)
//       .ticks(10, "~n");
//       // .tickFormat((tickValue) => tickValue);
//     yAxisG.call(yAxis);
//   }, [yScale, innerWidth]);
  
//   return (
//     <g ref={ref} />
//   );
// };
