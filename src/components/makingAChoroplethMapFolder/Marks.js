import * as d3 from 'd3';

const projection = d3.geoNaturalEarth1();
const path = d3.geoPath(projection);
const graticule = d3.geoGraticule();

const missingDataColor = 'gray';

export const Marks = ({ 
  worldAtlas: { countries, interiors }, 
  rowByNumericCode, 
  colorScale, 
  colorValue 
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
        countries.features.map((feature, id) => {
          const d = rowByNumericCode.get(feature.id);
          if (!d) {
            console.log(feature.properties.name);
          }
          return(
            <path 
              key={id}
              d={path(feature)}
              fill={d ? colorScale(colorValue(d)) : missingDataColor}
            />
          )
        }
        )
      }
      <path 
        className="interiors"
        d={path(interiors)}
      />
    </g>
  )
}
