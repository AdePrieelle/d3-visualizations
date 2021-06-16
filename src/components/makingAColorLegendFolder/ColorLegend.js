export const ColorLegend = ({ 
  colorScale, 
  tickSpacing = 20, 
  tickSize = 10,
  tickTextOffset = 20,
}) => {
  return (
    colorScale.domain().map((domainValue, id) => (
      <g transform={`translate(0,${id * tickSpacing})`} key={id}>
        <circle fill={colorScale(domainValue)} r={tickSize} />
        <text x={tickTextOffset} dy=".32em">{domainValue}</text>
      </g>
    ))
  )
}