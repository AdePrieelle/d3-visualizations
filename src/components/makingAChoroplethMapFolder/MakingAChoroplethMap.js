// Making a Choropleth Map (with React and D3)
// import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { useCodes } from './useCodes';
import { Marks } from './Marks';
import './MakingAChoroplethMap.css';

const width = 960;
const height = 500;
const selectedYear = "2017";

export const MakingAChoroplethMap = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const codes = useCodes();

  if(!worldAtlas || !data || !codes) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  // console.log(codes);

  const numericCodeByAlphaCode = new Map();
  codes.forEach(code => {
    const alpha3Code = code["alpha-3"];
    const numericCode = code["country-code"];
    numericCodeByAlphaCode.set(alpha3Code, numericCode);
  })
  // console.log(numericCodeByAlphaCode);

  const filteredData = data.filter(d => d.Year === selectedYear);

  const rowByNumericCode = new Map();
  filteredData.forEach(d => {
    const alpha3Code = d.Code;
    const numericCode = numericCodeByAlphaCode.get(alpha3Code);
    rowByNumericCode.set(numericCode, d);
  })
  // console.log(rowByNumericCode);

  const colorValue = d => d.aids;

  const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
    .domain([0, d3.max(data, colorValue)]);

  return (
    <svg className="svg-stylized-bar-chart" width={width} height={height}>
      <Marks 
        worldAtlas={worldAtlas} 
        rowByNumericCode={rowByNumericCode}
        colorScale={colorScale}
        colorValue={colorValue}
      />
    </svg>
  );
};