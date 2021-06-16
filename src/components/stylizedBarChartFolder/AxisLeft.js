export const AxisLeft= ({ yScale }) => {
  return (
    yScale.domain().map((tickValue) => (
      <g className="tick" key={tickValue}>
        <text 
          style={{textAnchor: 'end'}} 
          x={-3} 
          y={yScale(tickValue) + yScale.bandwidth() / 2}
          dy=".32em"
        >
          {tickValue}
        </text>
      </g>
    ))
  )
}
