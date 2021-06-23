export const SelectTimeOverlayTooltipText = ({
  tooltipWidth,
  tooltipHeight,
  hoveredTimeValue,
  hoveredPrecipitationValue,
  rainIntensity,
  xAxisTickFormat,
  tooltipXInset,
  tooltipYInset,
}) => {
  const getRainIntensityValueFromHoveredPrecipitationValue = (
    hoveredPrecipitationValue, 
    rainIntensity
  ) => {
    if (hoveredPrecipitationValue >= rainIntensity['Violent rain']) {
      return 'Violent rain';
    } else if (hoveredPrecipitationValue >= rainIntensity['Heavy rain']) {
      return 'Heavy rain';
    } else if (hoveredPrecipitationValue >= rainIntensity['Moderate rain']) {
      return 'Moderate rain';
    } else if (hoveredPrecipitationValue > rainIntensity['Light rain']) {
      return 'Light rain';
    } else if (hoveredPrecipitationValue === rainIntensity['No rain']) {
      return 'No rain';
    }
  };

  const precipitationTextValue = getRainIntensityValueFromHoveredPrecipitationValue(
    hoveredPrecipitationValue, 
    rainIntensity
  );

  return (
    <text className="select-time-overlay-tooltip-text">
      <tspan className="tspan-precipitation-text" dominantBaseline="hanging"
        x={tooltipXInset}
        y={tooltipYInset}
      >
        {precipitationTextValue}
      </tspan>
      <tspan className="tspan-time" textAnchor="end" dominantBaseline="hanging"
        x={tooltipWidth - tooltipXInset} 
        y={tooltipYInset} 
      >
        {xAxisTickFormat(hoveredTimeValue)}
      </tspan>
      <tspan className="tspan-precipitation-number"
        x={tooltipXInset}
        y={tooltipHeight - tooltipYInset} 
      >
        {parseFloat(hoveredPrecipitationValue.toFixed(2))} mm per hour
      </tspan>
    </text>
  )
}
