export const AxisLeft= ({ yScale }) => {
  return (
    yScale.domain().map((tickValue) => (
      <text 
        key={tickValue}
        style={{textAnchor: 'end'}} 
        x={-3} 
        y={yScale(tickValue) + yScale.bandwidth() / 2}
        dy=".32em"
      >
        {tickValue}
      </text>
    ))
  )
}
