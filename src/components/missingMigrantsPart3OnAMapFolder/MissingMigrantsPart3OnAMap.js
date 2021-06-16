// Missing Migrants Part 3: On a Map (with React and D3)
// import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { Marks } from './Marks';
import './MissingMigrantsPart3OnAMap.css';

const width = 960;
const height = 500;

export const MissingMigrantsPart3OnAMap = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  if(!worldAtlas || !data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  const sizeValue = d => d['Total Dead and Missing'];
  const maxRadius = 15;

  const sizeScale = d3.scaleSqrt()
    .domain([0, d3.max(data, sizeValue)])
    .range([0, maxRadius]);

  return (
    <svg className="svg-stylized-bar-chart" width={width} height={height}>
      <Marks 
        worldAtlas={worldAtlas} 
        data={data}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
};