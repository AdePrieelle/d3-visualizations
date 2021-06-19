export const SelectTimeOverlayTooltipCircle = ({
  radius,
  xScale,
  yScale,
  hoveredTimeValue,
  hoveredPrecipitationValue
}) => {
  return (
    <circle 
      className="select-time-overlay-tooltip-circle"
      r={radius} 
      cx={xScale(hoveredTimeValue)} 
      cy={yScale(hoveredPrecipitationValue)}
    />
  )
}
