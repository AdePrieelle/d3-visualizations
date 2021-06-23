export const AxisOuterLines = ({ innerWidth, innerHeight}) => {
  return (
    <g className="axis-outer-lines">
      <line y2={innerHeight} />
      <line x2={innerWidth} />
      <line x1={innerWidth} x2={innerWidth} y2={innerHeight} />
      <line x2={innerWidth} y1={innerHeight} y2={innerHeight} />
    </g>
  )
}
