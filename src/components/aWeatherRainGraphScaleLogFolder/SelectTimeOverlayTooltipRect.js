export const SelectTimeOverlayTooltipRect = ({
  width,
  height,
  xBorderRadius,
  yBorderRadius,
  tooltipXOffset,
  tooltipYOffset,
  xScale,
  yScale,
  innerWidth,
  innerHeight,
  hoveredTimeValue,
  hoveredPrecipitationValue
}) => {
  return (
    <rect 
      className="select-time-overlay-tooltip-rect"
      width={width} 
      height={height} 
      rx={xBorderRadius}
      ry={yBorderRadius}
      x={xScale(hoveredTimeValue) < (innerWidth / 2) 
          ? (xScale(hoveredTimeValue) + tooltipXOffset)
          : (xScale(hoveredTimeValue) - (width + tooltipXOffset))
      } 
      y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
        ? (yScale(hoveredPrecipitationValue) + tooltipYOffset)
        : (yScale(hoveredPrecipitationValue) - (height + tooltipYOffset))
      } 
    />
  )
}
