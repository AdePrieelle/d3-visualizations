export const SelectTimeOverlayTooltipRect = ({
  tooltipWidth,
  tooltipHeight,
  xBorderRadius,
  yBorderRadius,
}) => {
  return (
    <rect 
      className="select-time-overlay-tooltip-rect"
      width={tooltipWidth} 
      height={tooltipHeight} 
      rx={xBorderRadius}
      ry={yBorderRadius}
    />
  )
}
