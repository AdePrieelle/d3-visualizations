export const AxisLeftTick = ({
  yScale,
  rainIntensity,
  rainIntensityValue,
  innerWidth,
  tickOffsetAxisLeft
}) => {
  return (
    <g className="tick" transform={`translate(0,${yScale(rainIntensity[rainIntensityValue])})`}>
      <line x2={innerWidth} />
      <text 
        style={{textAnchor: 'end'}} 
        x={-tickOffsetAxisLeft} 
        dy=".32em"
      >
        {rainIntensityValue}
      </text>
    </g>
  )
}
