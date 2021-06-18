export const SelectTimeOverlayTooltip = ({
  xScale,
  yScale,
  hoveredTimeValue,
  hoveredPrecipitationValue,
  innerWidth,
  innerHeight,
  rainIntensity,
  xAxisTickFormat
}) => {
  return (
    <g>
      <circle 
        r={8} 
        fill="black" 
        cx={xScale(hoveredTimeValue)} 
        cy={yScale(hoveredPrecipitationValue)}
      />
      <rect 
        fill="rgba(0,0,0,0.8)" 
        width={190} 
        height={65} 
        rx={12}
        ry={12}
        x={xScale(hoveredTimeValue) < (innerWidth / 2) 
            ? (xScale(hoveredTimeValue) + 10)
            : (xScale(hoveredTimeValue) - 200)
        } 
        y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
          ? (yScale(hoveredPrecipitationValue) + 10)
          : (yScale(hoveredPrecipitationValue) - 80)
        } 
      />
      <text fill="white" fontSize="14">
        <tspan className="tspan-precipitation-text"
          x={xScale(hoveredTimeValue) < (innerWidth / 2) 
            ? (xScale(hoveredTimeValue) + 20)
            : (xScale(hoveredTimeValue) - 190)
          }
          y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
            ? (yScale(hoveredPrecipitationValue) + 35)
            : (yScale(hoveredPrecipitationValue) - 55)
          } 
        >
          {
              (hoveredPrecipitationValue === rainIntensity['No rain'])
            ? 'No rain'
            : (hoveredPrecipitationValue >= rainIntensity['Violent rain'])
            ? 'Violent rain'
            : (hoveredPrecipitationValue >= rainIntensity['Heavy rain'])
            ? 'Heavy rain'
            : (hoveredPrecipitationValue >= rainIntensity['Moderate rain'])
            ? 'Moderate rain'
            : (hoveredPrecipitationValue > rainIntensity['Light rain'])
            ? 'Light rain'
            : null
          }
        </tspan>
        <tspan className="tspan-time"
          x={xScale(hoveredTimeValue) < (innerWidth / 2) 
            ? (xScale(hoveredTimeValue) + 155)
            : (xScale(hoveredTimeValue) - 55)
          } 
          y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
            ? (yScale(hoveredPrecipitationValue) + 35)
            : (yScale(hoveredPrecipitationValue) - 55)
          } 
        >
          {xAxisTickFormat(hoveredTimeValue)}
        </tspan>
        <tspan className="tspan-precipitation-number"
          x={xScale(hoveredTimeValue) < (innerWidth / 2) 
            ? (xScale(hoveredTimeValue) + 20)
            : (xScale(hoveredTimeValue) - 190)
          }
          y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
            ? (yScale(hoveredPrecipitationValue) + 60)
            : (yScale(hoveredPrecipitationValue) - 30)
          } 
        >
          {hoveredPrecipitationValue} mm per hour
        </tspan>
        
      </text>
    </g>
  )
}
