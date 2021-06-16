import { Marks } from './Marks';
import * as d3 from 'd3';

export const BubbleMap = ({ data, worldAtlas }) => {
  const sizeValue = d => d['Total Dead and Missing'];
  const maxRadius = 15;

  const sizeScale = d3.scaleSqrt()
    .domain([0, d3.max(data, sizeValue)])
    .range([0, maxRadius]);
  
  return (
    <Marks 
      worldAtlas={worldAtlas} 
      data={data}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  )
}
