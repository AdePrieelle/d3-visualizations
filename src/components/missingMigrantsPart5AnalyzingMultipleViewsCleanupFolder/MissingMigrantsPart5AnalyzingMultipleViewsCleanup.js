// Missing Migrants Part 5: Analyzing Multiple Views Cleanup (On a Map) (with React and D3)
// import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import './MissingMigrantsPart5AnalyzingMultipleViewsCleanup.css';
import { BubbleMap } from './BubbleMap/BubbleMap';
import { DateHistogram } from './DateHistogram/DateHistogram';

const width = 960;
const height = 500;
const dateHistogramSize = 0.2;

export const MissingMigrantsPart5AnalyzingMultipleViewsCleanup = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  if(!worldAtlas || !data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  return (
    <svg className="svg-stylized-bar-chart" width={width} height={height}>
      <BubbleMap data={data} worldAtlas={worldAtlas} />
      <g transform={`translate(0, ${height - (dateHistogramSize * height)})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} />
      </g>
    </svg>
  );
};