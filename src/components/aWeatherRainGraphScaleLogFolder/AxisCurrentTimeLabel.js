export const AxisCurrentTimeLabel = ({ 
  axisCurrentTimeLabelXOffset, 
  axisCurrentTimeLabelYOffset, 
  axisCurrentTimeTextLabel
}) => {
  return (
    <text 
      className="text-label-now"
      textAnchor="middle"
      transform={`translate(${axisCurrentTimeLabelXOffset},${-axisCurrentTimeLabelYOffset})`}
    >
      {axisCurrentTimeTextLabel}
    </text>
  )
}
