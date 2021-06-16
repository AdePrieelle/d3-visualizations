// Missing Migrants Part 4: Analyzing Multiple Views (On a Map) (with React and D3)
// import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import './MissingMigrantsPart4AnalyzingMultipleViews.css';
import { BubbleMap } from './BubbleMap';
import { DateHistogram } from './DateHistogram';

const width = 960;
const height = 500;

export const MissingMigrantsPart4AnalyzingMultipleViews = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  if(!worldAtlas || !data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  return (
    <svg className="svg-stylized-bar-chart" width={width} height={height}>
      <BubbleMap data={data} worldAtlas={worldAtlas} />
      <DateHistogram data={data} />
    </svg>
  );
};