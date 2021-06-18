export const SelectTimeOverlayLine = ({ 
  xScale, 
  hoveredTimeValue, 
  innerHeight
}) => {
  return(
    <line 
      className="select-time-overlay-line"
      x1={xScale(hoveredTimeValue)} 
      x2={xScale(hoveredTimeValue)} 
      y1={0} 
      y2={innerHeight} 
    />
  )
}
