export const AxisLeft= ({ 
  yScale, 
  innerWidth, 
  tickOffset = 3,
  rainIntensity
 }) => {
  return (
    <g className="axis">
      <g className="tick" transform={`translate(0,${yScale(rainIntensity['Light rain'])})`}>
        <line x2={innerWidth} />
        <text 
          style={{textAnchor: 'end'}} 
          x={-tickOffset} 
          dy=".32em"
        >
          Light rain
        </text>
      </g>
      <g className="tick" transform={`translate(0,${yScale(rainIntensity['Moderate rain'])})`}>
        <line x2={innerWidth} />
        <text 
          style={{textAnchor: 'end'}} 
          x={-tickOffset} 
          dy=".32em"
        >
          Moderate rain
        </text>
      </g>
      {(yScale.domain()[1] > rainIntensity['Moderate rain'])
        ? <g className="tick" transform={`translate(0,${yScale(rainIntensity['Heavy rain'])})`}>
            <line x2={innerWidth} />
            <text 
              style={{textAnchor: 'end'}} 
              x={-tickOffset} 
              dy=".32em"
            >
              Heavy rain
            </text>
          </g>
        : null
      }
      {(yScale.domain()[1] > rainIntensity['Heavy rain'])
        ? <g className="tick" transform={`translate(0,${yScale(rainIntensity['Violent rain'])})`}>
            <line x2={innerWidth} />
            <text 
              style={{textAnchor: 'end'}} 
              x={-tickOffset} 
              dy=".32em"
            >
              Violent rain
            </text>
          </g>
        : null
      }
    </g>
  )
}
