import { SelectTimeOverlayTooltipCircle } from './SelectTimeOverlayTooltipCircle';
import { SelectTimeOverlayTooltipRect } from './SelectTimeOverlayTooltipRect';
import { SelectTimeOverlayTooltipText } from './SelectTimeOverlayTooltipText';

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
  const radius = 8;
  const width = 190;
  const height = 65;
  const xBorderRadius = 12;
  const yBorderRadius = 12;
  const tooltipXOffset = 10;
  const tooltipYOffset = 10;

  return (
    <g>
      <SelectTimeOverlayTooltipCircle 
        radius={radius}
        xScale={xScale}
        yScale={yScale}
        hoveredTimeValue={hoveredTimeValue}
        hoveredPrecipitationValue={hoveredPrecipitationValue}
      />

      <SelectTimeOverlayTooltipRect 
        width={width}
        height={height}
        xBorderRadius={xBorderRadius}
        yBorderRadius={yBorderRadius}
        tooltipXOffset={tooltipXOffset}
        tooltipYOffset={tooltipYOffset}
        xScale={xScale}
        yScale={yScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        hoveredTimeValue={hoveredTimeValue}
        hoveredPrecipitationValue={hoveredPrecipitationValue}
      />

      <SelectTimeOverlayTooltipText 
        xScale={xScale}
        yScale={yScale}
        width={width}
        height={height}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        hoveredTimeValue={hoveredTimeValue}
        hoveredPrecipitationValue={hoveredPrecipitationValue}
        rainIntensity={rainIntensity}
        xAxisTickFormat={xAxisTickFormat}
        xBorderRadius={xBorderRadius}
        yBorderRadius={yBorderRadius}
        tooltipXOffset={tooltipXOffset}
        tooltipYOffset={tooltipYOffset}
      />

      {/* <text fill="white" fontSize="14">
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
      </text> */}


    </g>
  )
}
