import * as d3 from 'd3';

const projection = d3.geoNaturalEarth1();
const path = d3.geoPath(projection);
const graticule = d3.geoGraticule();

export const Marks = ({ 
  worldAtlas: { land, interiors }, 
  cities, 
  sizeScale, 
  sizeValue 
}) => {
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
      {cities.map((d, id) => {
        const [x, y] = projection ([d.lng, d.lat]);
        return <circle key={id} cx={x} cy={y} r={sizeScale(sizeValue(d))} />
      })}
    </g>
  )
}
