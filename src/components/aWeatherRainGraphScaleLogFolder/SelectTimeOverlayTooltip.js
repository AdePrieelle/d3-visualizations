import { SelectTimeOverlayTooltipCircle } from './SelectTimeOverlayTooltipCircle';
import { SelectTimeOverlayTooltipRect } from './SelectTimeOverlayTooltipRect';
import { SelectTimeOverlayTooltipText } from './SelectTimeOverlayTooltipText';

export const SelectTimeOverlayTooltip = ({
  xScale,
  yScale,
  hoveredTimeValue,
  hoveredPrecipitationValue,
  width,
  innerWidth,
  innerHeight,
  rainIntensity,
  xAxisTickFormat
}) => {
  let radius;
  let tooltipWidth;
  let tooltipHeight;
  let xBorderRadius;
  let yBorderRadius;
  let tooltipXOffset;
  let tooltipYOffset;
  let tooltipXInset;
  let tooltipYInset;

  const calculateTooltipSize = (width) => {
    if (width < 480) {
      tooltipWidth = 120;
      tooltipHeight = 40;
      radius = 6;
      xBorderRadius = 6;
      yBorderRadius = 6;
      tooltipXOffset = 4;
      tooltipYOffset = 4;
      tooltipXInset = 6;
      tooltipYInset = 6;
    } else if (width < 700) {
      tooltipWidth = 160;
      tooltipHeight = 55;
      radius = 7;
      xBorderRadius = 10;
      yBorderRadius = 10;
      tooltipXOffset = 8;
      tooltipYOffset = 8;
      tooltipXInset = 10;
      tooltipYInset = 10;
    } else {
      tooltipWidth = 190;
      tooltipHeight = 65;
      radius = 8;
      xBorderRadius = 12;
      yBorderRadius = 12;
      tooltipXOffset = 10;
      tooltipYOffset = 10;
      tooltipXInset = 12;
      tooltipYInset = 12;
    }
  }

  calculateTooltipSize(width);

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
          : (xScale(hoveredTimeValue) - (tooltipWidth + tooltipXOffset))
        },
        ${yScale(hoveredPrecipitationValue) < (innerHeight / 2)
          ? (yScale(hoveredPrecipitationValue) + (tooltipYOffset))
          : (yScale(hoveredPrecipitationValue) - (tooltipHeight + tooltipYOffset))
        }
      )`}>
        <SelectTimeOverlayTooltipRect 
          tooltipWidth={tooltipWidth}
          tooltipHeight={tooltipHeight}
          xBorderRadius={xBorderRadius}
          yBorderRadius={yBorderRadius}
        />
        <SelectTimeOverlayTooltipText 
          tooltipWidth={tooltipWidth}
          tooltipHeight={tooltipHeight}
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
