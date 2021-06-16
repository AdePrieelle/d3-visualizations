import * as d3 from 'd3';

const projection = d3.geoNaturalEarth1();
const path = d3.geoPath(projection);
const graticule = d3.geoGraticule();

export const Marks = ({ data: { land, interiors } }) => {
  return (
    <g className="marks">
      <path 
        className="sphere"
        d={path({ type: 'Sphere' })}
      />
      <path 
        className="graticules"
        d={path(graticule())}
      />
      {
        land.features.map((feature, id) => (
          <path 
            key={id}
            className="land"
            d={path(feature)}
          />
        ))
      }
      <path 
        className="interiors"
        d={path(interiors)}
      />
    </g>
  )
}
