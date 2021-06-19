export const SelectTimeOverlayTooltipRect = ({
  width,
  height,
  xBorderRadius,
  yBorderRadius,
}) => {
  return (
    <rect 
      className="select-time-overlay-tooltip-rect"
      width={width} 
      height={height} 
      rx={xBorderRadius}
      ry={yBorderRadius}
    />
  )
}
