export const Marks = ({ 
  binnedData, 
  xScale, 
  yScale, 
  tooltipFormat, 
  innerHeight,

}) => {
  return (
    binnedData.map((d, id) => (
      <rect 
        className="mark"
        key={id}
        x={xScale(d.x0)} 
        y={yScale(d.y)} 
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.y)}
      >
        <title>{tooltipFormat(d.y)}</title>
      </rect>
    ))
  )
}
