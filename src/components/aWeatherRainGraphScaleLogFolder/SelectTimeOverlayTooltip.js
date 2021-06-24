import { SelectTimeOverlayTooltipCircle } from './SelectTimeOverlayTooltipCircle';
import { SelectTimeOverlayTooltipRect } from './SelectTimeOverlayTooltipRect';
import { SelectTimeOverlayTooltipText } from './SelectTimeOverlayTooltipText';
import { useCalculateTooltipSize } from './useCalculateTooltipSize';

export const SelectTimeOverlayTooltip = ({
  xScale,
  yScale,
  hoveredTimeValue,
  hoveredPrecipitationValue,
  width,
  innerWidth,
  innerHeight,
  rainIntensity,
  xAxisTickFormat,
  widthBreakpointSmall,
  widthBreakpointMedium
}) => {
  const tooltipSize = useCalculateTooltipSize(
    width, 
    widthBreakpointSmall,
    widthBreakpointMedium
  );

  return (
    <g>
      <SelectTimeOverlayTooltipCircle 
        radius={tooltipSize.radius}
        xScale={xScale}
        yScale={yScale}
        hoveredTimeValue={hoveredTimeValue}
        hoveredPrecipitationValue={hoveredPrecipitationValue}
      />
      <g transform={`translate(
        ${xScale(hoveredTimeValue) < (innerWidth / 2)
          ? (xScale(hoveredTimeValue) + (tooltipSize.tooltipXOffset))
          : (xScale(hoveredTimeValue) - (tooltipSize.tooltipWidth + tooltipSize.tooltipXOffset))
        },
        ${yScale(hoveredPrecipitationValue) < (innerHeight / 2)
          ? (yScale(hoveredPrecipitationValue) + (tooltipSize.tooltipYOffset))
          : (yScale(hoveredPrecipitationValue) - (tooltipSize.tooltipHeight + tooltipSize.tooltipYOffset))
        }
      )`}>
        <SelectTimeOverlayTooltipRect 
          tooltipWidth={tooltipSize.tooltipWidth}
          tooltipHeight={tooltipSize.tooltipHeight}
          xBorderRadius={tooltipSize.xBorderRadius}
          yBorderRadius={tooltipSize.yBorderRadius}
        />
        <SelectTimeOverlayTooltipText 
          tooltipWidth={tooltipSize.tooltipWidth}
          tooltipHeight={tooltipSize.tooltipHeight}
          hoveredTimeValue={hoveredTimeValue}
          hoveredPrecipitationValue={hoveredPrecipitationValue}
          rainIntensity={rainIntensity}
          xAxisTickFormat={xAxisTickFormat}
          tooltipXInset={tooltipSize.tooltipXInset}
          tooltipYInset={tooltipSize.tooltipYInset}
        />
      </g>
    </g>
  )
}
