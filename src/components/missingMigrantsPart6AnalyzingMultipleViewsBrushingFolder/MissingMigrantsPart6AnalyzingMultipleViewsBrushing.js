// Missing Migrants Part 6: Analyzing Multiple Views Brushing (On a Map) (with React and D3)
// import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useState } from 'react';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import './MissingMigrantsPart6AnalyzingMultipleViewsBrushing.css';
import { BubbleMap } from './BubbleMap/BubbleMap';
import { DateHistogram } from './DateHistogram/DateHistogram';

const width = 960;
const height = 500;
const dateHistogramSize = 0.2;

const xValue = d => d['Reported Date'];

export const MissingMigrantsPart6AnalyzingMultipleViewsBrushing = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const [brushExtent, setBrushExtent] = useState();

  if(!worldAtlas || !data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  const filteredData = brushExtent ? data.filter(d => {
    const date = xValue(d);
    return date > brushExtent[0] && date < brushExtent[1];
  }) : data;

  return (
    <svg className="svg-stylized-bar-chart" width={width} height={height}>
      <BubbleMap data={filteredData} worldAtlas={worldAtlas} />
      <g transform={`translate(0, ${height - (dateHistogramSize * height)})`}>
        <DateHistogram 
          data={data} 
          width={width} 
          height={dateHistogramSize * height}
          setBrushExtent={setBrushExtent} 
          xValue={xValue}
        />
      </g>
    </svg>
  );
};