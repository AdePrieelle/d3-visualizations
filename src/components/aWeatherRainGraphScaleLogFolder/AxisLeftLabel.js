export const AxisLeftLabel = ({ 
  yAxisLabelOffset, 
  innerHeight, 
  yAxisLabel, 
}) => {
  return (
    <text 
      className="axis-label" 
      textAnchor="middle"
      transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
    >
      {yAxisLabel}
    </text>
  )
};
