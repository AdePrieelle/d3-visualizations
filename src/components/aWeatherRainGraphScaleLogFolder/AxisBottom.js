import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useSvgWrapperSize } from './useSvgWrapperSize';

export const AxisBottom = ({ xScale, innerHeight }) => {
  const ref = useRef();
  const width = useSvgWrapperSize()[0];
  const widthBreakpointSmall = 480;
  const widthBreakpointMedium = 700;
  const widthBreakpointLarge = 900;
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
      .tickFormat(d3.timeFormat("%H:%M"))
      .tickPadding(tickPaddingAmount);
    xAxisG.call(xAxis);
  }, [xScale, innerHeight, ticksAmount, tickPaddingAmount]);
  
  return (
    <g className="axis" transform={`translate(0,${innerHeight})`} ref={ref} />
  );
};
