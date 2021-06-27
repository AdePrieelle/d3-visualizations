export const useCalculateTooltipSize = (
  width,
  widthBreakpointSmall,
  widthBreakpointMedium
) => {
  // tooltip size objects for all breakpoints

  const tooltipSizeBreakpointSmall = {
    tooltipWidth: 120,
    tooltipHeight: 40,
    radius: 6,
    xBorderRadius: 6,
    yBorderRadius: 6,
    tooltipXOffset: 4,
    tooltipYOffset: 4,
    tooltipXInset: 6,
    tooltipYInset: 6
  }

  const tooltipSizeBreakpointMedium = {
    tooltipWidth: 160,
    tooltipHeight: 55,
    radius: 7,
    xBorderRadius: 10,
    yBorderRadius: 10,
    tooltipXOffset: 8,
    tooltipYOffset: 8,
    tooltipXInset: 10,
    tooltipYInset: 10
  }

  const tooltipSizeBreakpointLarge = {
    tooltipWidth: 190,
    tooltipHeight: 65,
    radius: 8,
    xBorderRadius: 12,
    yBorderRadius: 12,
    tooltipXOffset: 10,
    tooltipYOffset: 10,
    tooltipXInset: 12,
    tooltipYInset: 12
  }

  const calculateWidthBreakpointTooltipSize = (width) => {
    if (width < widthBreakpointSmall) {
      return tooltipSizeBreakpointSmall;
    } else if (width < widthBreakpointMedium) {
      return tooltipSizeBreakpointMedium;
    } else {
      return tooltipSizeBreakpointLarge;
    }
  }

  return calculateWidthBreakpointTooltipSize(width);
}
