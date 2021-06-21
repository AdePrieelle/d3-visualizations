import { SelectTimeOverlayTooltipCircle } from './SelectTimeOverlayTooltipCircle';
import { SelectTimeOverlayTooltipRect } from './SelectTimeOverlayTooltipRect';
import { SelectTimeOverlayTooltipText } from './SelectTimeOverlayTooltipText';
import { useSvgWrapperSize } from './useSvgWrapperSize';

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
  let radius;
  let width;
  let height;
  let xBorderRadius;
  let yBorderRadius;
  let tooltipXOffset;
  let tooltipYOffset;
  let tooltipXInset;
  let tooltipYInset;

  const svgWrapperWidth = useSvgWrapperSize()[0];
  const calculateTooltipSize = (svgWrapperWidth) => {
    if (svgWrapperWidth < 480) {
      width = 120;
      radius = 6;
      height = 40;
      xBorderRadius = 6;
      yBorderRadius = 6;
      tooltipXOffset = 4;
      tooltipYOffset = 4;
      tooltipXInset = 6;
      tooltipYInset = 6;
    } else if (svgWrapperWidth < 700) {
      width = 160;
      radius = 7;
      height = 55;
      xBorderRadius = 10;
      yBorderRadius = 10;
      tooltipXOffset = 8;
      tooltipYOffset = 8;
      tooltipXInset = 10;
      tooltipYInset = 10;
    } else {
      width = 190;
      radius = 8;
      height = 65;
      xBorderRadius = 12;
      yBorderRadius = 12;
      tooltipXOffset = 10;
      tooltipYOffset = 10;
      tooltipXInset = 12;
      tooltipYInset = 12;
    }
  }

  calculateTooltipSize(svgWrapperWidth);

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
