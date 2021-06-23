export const SelectTimeOverlayTooltipText = ({
  width,
  height,
  hoveredTimeValue,
  hoveredPrecipitationValue,
  rainIntensity,
  xAxisTickFormat,
  tooltipXInset,
  tooltipYInset,
}) => {
  return (
    <text className="select-time-overlay-tooltip-text">
      <tspan className="tspan-precipitation-text" dominantBaseline="hanging"
        x={tooltipXInset}
        y={tooltipYInset}
      >
        {
            (hoveredPrecipitationValue === rainIntensity['No rain'])
          ? 'No rain'
          : (hoveredPrecipitationValue >= rainIntensity['Violent rain'])
          ? 'Violent rain'
          : (hoveredPrecipitationValue >= rainIntensity['Heavy rain'])
          ? 'Heavy rain'
          : (hoveredPrecipitationValue >= rainIntensity['Moderate rain'])
          ? 'Moderate rain'
          : (hoveredPrecipitationValue > rainIntensity['Light rain'])
          ? 'Light rain'
          : null
        }
      </tspan>
      <tspan className="tspan-time" textAnchor="end" dominantBaseline="hanging"
        x={width - tooltipXInset} 
        y={tooltipYInset} 
      >
        {xAxisTickFormat(hoveredTimeValue)}
      </tspan>
      <tspan className="tspan-precipitation-number"
        x={tooltipXInset}
        y={height - tooltipYInset} 
      >
        {parseFloat(hoveredPrecipitationValue.toFixed(2))} mm per hour
      </tspan>
    </text>
  )
}
