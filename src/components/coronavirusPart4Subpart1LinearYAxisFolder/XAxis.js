import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export const XAxis = ({ xScale, innerHeight }) => {
  const ref = useRef();
  useEffect(() => {
    const xAxisG = d3.select(ref.current);
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(18);
    xAxisG.call(xAxis);
  }, [xScale, innerHeight]);
  
  return (
    <g transform={`translate(0,${innerHeight})`} ref={ref} />
  );
};
