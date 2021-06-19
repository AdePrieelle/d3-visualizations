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
  const tooltipXInset = 12;
  const tooltipYInset = 12;

  return (
    <g>
      <SelectTimeOverlayTooltipCircle 
        radius={radius}
        xScale={xScale}
        yScale={yScale}
        hoveredTimeValue={hoveredTimeValue}
        hoveredPrecipitationValue={hoveredPrecipitationValue}
      />
      <g transform={`translate(
        ${xScale(hoveredTimeValue) < (innerWidth / 2)
          ? (xScale(hoveredTimeValue) + (tooltipXOffset))
          : (xScale(hoveredTimeValue) - (width + tooltipXOffset))
        },
        ${yScale(hoveredPrecipitationValue) < (innerHeight / 2)
          ? (yScale(hoveredPrecipitationValue) + (tooltipYOffset))
          : (yScale(hoveredPrecipitationValue) - (height + tooltipYOffset))
        }
      )`}>
        <SelectTimeOverlayTooltipRect 
          width={width}
          height={height}
          xBorderRadius={xBorderRadius}
          yBorderRadius={yBorderRadius}
        />
        <SelectTimeOverlayTooltipText 
          width={width}
          height={height}
          hoveredTimeValue={hoveredTimeValue}
          hoveredPrecipitationValue={hoveredPrecipitationValue}
          rainIntensity={rainIntensity}
          xAxisTickFormat={xAxisTickFormat}
          tooltipXInset={tooltipXInset}
          tooltipYInset={tooltipYInset}
        />
      </g>
    </g>
  )
}
