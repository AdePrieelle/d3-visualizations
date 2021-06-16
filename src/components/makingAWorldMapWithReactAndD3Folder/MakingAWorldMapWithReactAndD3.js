// Making a World Map (with React and D3)
// import { useState, useEffect } from 'react';
// import * as d3 from 'd3';
// import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useData } from './useData';
import { Marks } from './Marks';
import './MakingAWorldMapWithReactAndD3.css';

const width = 960;
const height = 500;

export const MakingAWorldMapWithReactAndD3 = () => {
  const data = useData();

  if(!data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  console.log(data[0]);

  return (
    <svg className="svg-stylized-bar-chart" width={width} height={height}>
      <Marks data={data} />
    </svg>
  );
};