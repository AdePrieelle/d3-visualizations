export const AxisOuterLines = ({ innerWidth, innerHeight}) => {
  return (
    <>
      <line stroke="#c0c0bb" strokeLinecap="square" y2={innerHeight} />
      <line stroke="#c0c0bb" strokeLinecap="square" x2={innerWidth} />
      <line stroke="#c0c0bb" strokeLinecap="square" x1={innerWidth} x2={innerWidth} y2={innerHeight} />
      <line stroke="#c0c0bb" strokeLinecap="square" x2={innerWidth} y1={innerHeight} y2={innerHeight} />
    </>
  )
}