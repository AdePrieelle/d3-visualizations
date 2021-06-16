import { useMemo } from 'react';
import { Marks } from './Marks';
import * as d3 from 'd3';

const sizeValue = d => d['Total Dead and Missing'];
const maxRadius = 15;

export const BubbleMap = ({ data, filteredData, worldAtlas }) => {

  const sizeScale = useMemo(
    () => 
      d3.scaleSqrt()
      .domain([0, d3.max(data, sizeValue)])
      .range([0, maxRadius]),
    [data]
  );
  
  return (
    <Marks 
      worldAtlas={worldAtlas} 
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  )
}
