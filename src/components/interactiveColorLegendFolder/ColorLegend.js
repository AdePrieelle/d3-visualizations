export const ColorLegend = ({ 
  colorScale, 
  tickSpacing = 20, 
  tickSize = 10,
  tickTextOffset = 20,
  onHover,
  hoveredValue,
  fadeOpacity
}) => {
  return (
    colorScale.domain().map((domainValue, id) => (
      <g 
        key={id} 
        transform={`translate(0,${id * tickSpacing})`} 
        onMouseEnter={() => { onHover(domainValue); }}
        onMouseOut={() => { onHover(null); }}
        opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
      >
        <circle fill={colorScale(domainValue)} r={tickSize} />
        <text x={tickTextOffset} dy=".32em">
          {domainValue}
        </text>
      </g>
    ))
  )
}