export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius }) => {
  return (
    data.map((d, id) => (
      <circle 
        className="mark"
        key={id}
        cx={xScale(xValue(d))} 
        cy={yScale(yValue(d))} 
        r={circleRadius}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    ))
  )
}
