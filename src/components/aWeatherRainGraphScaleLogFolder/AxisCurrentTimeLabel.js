export const AxisCurrentTimeLabel = ({ 
  axisCurrentTimeLabelXOffset, 
  axisCurrentTimeLabelYOffset, 
  axisCurrentTimeTextLabel
}) => {
  return (
    <text 
      className="text-label-current-time"
      textAnchor="middle"
      transform={`translate(${axisCurrentTimeLabelXOffset},${-axisCurrentTimeLabelYOffset})`}
    >
      {axisCurrentTimeTextLabel}
    </text>
  )
}
