// Visualizing Data with React & D3
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// import { csv, csvFormat } from 'd3';

const csvUrl =
    "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";
  // "https://gist.githubusercontent.com/AdePrieelle/9dad0c2cc847e2986d375e131fd9ece6/raw/cssNamedColors.csv";

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = d3.arc()
  .innerRadius(0)
  .outerRadius(width);

export const VisualizingDataWithReactAndD3 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // With d3.csv
    d3.csv(csvUrl).then((data) => {
      console.log("Fetching data");
      setData(data);
    });
  }, [])

  if(!data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  const colorPie = d3.pie().value(1);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX},${centerY})`}>
        {
          // d3.pie()
          //   .value(1)(data)
          colorPie(data)
            .map((d, i) => (
              <path 
                key={i}
                fill={d.data['RGB hex value']}
                d={pieArc(d)}
              />
            ))
        }


        {/* {
          data.map((d, i) => (
            <path 
              key={i}
              fill={d['RGB hex value']}
              d={pieArc({
                startAngle: i / data.length * 2 * Math.PI,
                endAngle: (i+1) / data.length * 2 * Math.PI
              })}
            />
          ))
        } */}
      </g>
    </svg>
  );
};