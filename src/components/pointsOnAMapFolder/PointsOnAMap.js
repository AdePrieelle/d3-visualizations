// Points on a Map (Making a World Map) (with React and D3)
// import { useState, useEffect } from 'react';
// import * as d3 from 'd3';
// import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useCities } from './useCities';
import { Marks } from './Marks';
import './PointsOnAMap.css';

const width = 960;
const height = 500;

export const PointsOnAMap = () => {
  const worldAtlas = useWorldAtlas();
  const cities = useCities();

  if(!worldAtlas || !cities) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  return (
    <svg className="svg-stylized-bar-chart" width={width} height={height}>
      <Marks worldAtlas={worldAtlas} cities={cities} />
    </svg>
  );
};