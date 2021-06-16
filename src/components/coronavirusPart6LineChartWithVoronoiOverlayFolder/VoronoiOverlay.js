import * as d3 from 'd3';
import { useMemo } from 'react';

export const VoronoiOverlay = ({ 
  innerWidth, 
  innerHeight, 
  allData, 
  lineGenerator,
  onHover
}) => {
  return useMemo(() => {
    console.log("memoizing");
    const points = allData.map(d => ([lineGenerator.x()(d), lineGenerator.y()(d)]));
    const delaunay = d3.Delaunay.from(points);
    const voronoi =  delaunay.voronoi([0, 0, innerWidth, innerHeight]);
    return (
      <g className="voronoi">
        {points.map((point, id) => (
          <path 
            onMouseEnter={() => onHover(allData[id])}
            key={id} 
            fill="none" 
            stroke="pink" 
            d={voronoi.renderCell(id)} 
          />
        ))}
      </g>
    );
  }, [allData, innerHeight, innerWidth, lineGenerator, onHover]);
}
