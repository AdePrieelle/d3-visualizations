export const AxisLeftTick = ({
  yScale,
  rainIntensity,
  rainIntensityValue,
  innerWidth,
  axisLeftTickOffset
}) => {
  return (
    <g className="tick" transform={`translate(0,${yScale(rainIntensity[rainIntensityValue])})`}>
      <line x2={innerWidth} />
      <text 
        style={{textAnchor: 'end'}} 
        x={-axisLeftTickOffset} 
        dy=".32em"
      >
        {rainIntensityValue}
      </text>
    </g>
  )
}
