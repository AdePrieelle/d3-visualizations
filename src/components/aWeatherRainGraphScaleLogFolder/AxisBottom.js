import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export const AxisBottom = ({ 
  width, 
  xScale, 
  innerHeight, 
  xAxisTickFormat,
  widthBreakpointSmall,
  widthBreakpointMedium,
  widthBreakpointLarge,
  axisBottomTicksAmountLarge,
  axisBottomTicksAmountSmall,
  axisBottomTickPaddingLarge,
  axisBottomTickPaddingMedium,
  axisBottomTickPaddingSmall
}) => {
  const ref = useRef();

  const calculateTicksAmount = (width) => {
    if (width >= widthBreakpointMedium) {
      return axisBottomTicksAmountLarge;
    } else {
      return axisBottomTicksAmountSmall;
    }
  }

  const calculateTickPaddingAmount = (width) => {
    if (width >= widthBreakpointLarge) {
      return axisBottomTickPaddingLarge;
    } else if (width >= widthBreakpointSmall) {
      return axisBottomTickPaddingMedium;
    } else {
      return axisBottomTickPaddingSmall;
    }
  }
  
  const ticksAmount = calculateTicksAmount(width);
  const tickPaddingAmount = calculateTickPaddingAmount(width);

  useEffect(() => {
    const xAxisG = d3.select(ref.current);
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .ticks(ticksAmount)
      .tickFormat(xAxisTickFormat)
      .tickPadding(tickPaddingAmount);
    xAxisG.call(xAxis);
  }, [xScale, innerHeight, ticksAmount, xAxisTickFormat,tickPaddingAmount]);
  
  return (
    <g className="axis" transform={`translate(0,${innerHeight})`} ref={ref} />
  );
};
