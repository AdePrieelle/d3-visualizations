// Using Size (Points on a Map) (Making a World Map) (with React and D3)
// import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useCities } from './useCities';
import { Marks } from './Marks';
import './UsingSize.css';

const width = 960;
const height = 500;

export const UsingSize = () => {
  const worldAtlas = useWorldAtlas();
  const cities = useCities();

  if(!worldAtlas || !cities) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  const sizeValue = d => d.population;
  const maxRadius = 15;

  const sizeScale = d3.scaleSqrt()
    .domain([0, d3.max(cities, sizeValue)])
    .range([0, maxRadius]);

  return (
    <svg className="svg-stylized-bar-chart" width={width} height={height}>
      <Marks 
        worldAtlas={worldAtlas} 
        cities={cities} 
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
};