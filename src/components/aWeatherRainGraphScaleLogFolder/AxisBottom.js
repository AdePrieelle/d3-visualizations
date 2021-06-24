import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export const AxisBottom = ({ 
  width, 
  xScale, 
  innerHeight, 
  xAxisTickFormat,
  widthBreakpointSmall,
  widthBreakpointMedium,
  widthBreakpointLarge
}) => {
  const ref = useRef();

  const calculateTicksAmount = (width) => {
    if (width >= widthBreakpointMedium) {
      return 12;
    } else {
      return 4;
    }
  }

  const calculateTickPaddingAmount = (width) => {
    if (width >= widthBreakpointLarge) {
      return 16;
    } else if (width >= widthBreakpointSmall) {
      return 12;
    } else {
      return 10;
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
