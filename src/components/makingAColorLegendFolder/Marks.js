export const Marks = ({ 
  data, 
  xScale, 
  xValue, 
  yScale, 
  yValue, 
  colorScale,
  colorValue,
  tooltipFormat, 
  circleRadius 
}) => {
  return (
    data.map((d, id) => (
      <circle 
        className="mark"
        key={id}
        cx={xScale(xValue(d))} 
        cy={yScale(yValue(d))} 
        fill={colorScale(colorValue(d))}
        r={circleRadius}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    ))
  )
}
