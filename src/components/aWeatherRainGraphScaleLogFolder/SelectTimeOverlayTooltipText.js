export const SelectTimeOverlayTooltipText = ({
  xScale,
  yScale,
  width,
  height,
  innerWidth,
  innerHeight,
  hoveredTimeValue,
  hoveredPrecipitationValue,
  rainIntensity,
  xAxisTickFormat,
  xBorderRadius,
  yBorderRadius,
  tooltipXOffset,
  tooltipYOffset
}) => {
  return (
    <text className="select-time-overlay-tooltip-text">
      <tspan className="tspan-precipitation-text" dominantBaseline="hanging"
        x={xScale(hoveredTimeValue) < (innerWidth / 2) 
          ? (xScale(hoveredTimeValue) + (tooltipXOffset + xBorderRadius))
          : (xScale(hoveredTimeValue) - (width + tooltipXOffset - xBorderRadius))
        }
        y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
          ? (yScale(hoveredPrecipitationValue) + (tooltipYOffset + yBorderRadius))
          : (yScale(hoveredPrecipitationValue) - (height + tooltipYOffset - yBorderRadius))
        } 
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
        x={xScale(hoveredTimeValue) < (innerWidth / 2) 
          ? (xScale(hoveredTimeValue) + (width + tooltipXOffset - xBorderRadius))
          : (xScale(hoveredTimeValue) - (tooltipXOffset + xBorderRadius))
        } 
        y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
          ? (yScale(hoveredPrecipitationValue) + (tooltipYOffset + yBorderRadius))
          : (yScale(hoveredPrecipitationValue) - (height + tooltipYOffset - yBorderRadius))
        } 
      >
        {xAxisTickFormat(hoveredTimeValue)}
      </tspan>
      <tspan className="tspan-precipitation-number"
        x={xScale(hoveredTimeValue) < (innerWidth / 2) 
          ? (xScale(hoveredTimeValue) + (tooltipXOffset + xBorderRadius))
          : (xScale(hoveredTimeValue) - (width + tooltipXOffset - xBorderRadius))
        }
        y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
          ? (yScale(hoveredPrecipitationValue) + (height + tooltipYOffset - yBorderRadius))
          : (yScale(hoveredPrecipitationValue) - (tooltipYOffset + yBorderRadius))
        } 
      >
        {hoveredPrecipitationValue} mm per hour
      </tspan>
    </text>
  )
}
