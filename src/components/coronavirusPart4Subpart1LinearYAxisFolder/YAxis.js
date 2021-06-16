import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export const YAxis = ({ yScale, innerWidth }) => {
  const ref = useRef();
  useEffect(() => {
    const yAxisG = d3.select(ref.current);
    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(18);
    yAxisG.call(yAxis);
  }, [yScale, innerWidth]);
  
  return (
    <g ref={ref} />
  );
};
