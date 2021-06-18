export const AxisBottomLabel = ({ 
  innerWidth, 
  innerHeight, 
  xAxisLabelOffset, 
  xAxisLabel
}) => {
  return (
    <text 
      className="axis-label" 
      x={innerWidth / 2} 
      y={innerHeight + xAxisLabelOffset} 
      textAnchor="middle"
    >
      {xAxisLabel}
    </text>
  )
};