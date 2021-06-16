import * as d3 from 'd3';
import { exampleWeatherRainData } from './exampleWeatherRainData';
import { Marks } from './Marks';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import './AWeatherRainGraphBarChart.css';
import { useState } from 'react';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 80, left: 100 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 60;

export const AWeatherRainGraphBarChart = () => {
  // const data = rainData;
  // prob 2pm local timezone when we grabbed the exampleWeatherRainData
  // getting from 13:47 my time but need to adjust to local timezone time?
  // const data = exampleWeatherRainData;
  const dataInMiliseconds = exampleWeatherRainData.map(minute => (
    {
      dt: minute.dt*1000,
      precipitation: minute.precipitation
    }
  ));
  const data = dataInMiliseconds;


  // console.log(data);

  // if(!data) {
  //   return <pre style={{fontSize: "7em"}}>Loading...</pre>
  // }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xAxisTickFormat = d3.timeFormat("%H:%M");

  // console.log(data);
  
  // data.map(d => (console.log(d.precipitation)));
  const yValue = d => d.precipitation;
  const yAxisLabel = 'Precipitation in mm';

  const xValue = d => d.dt;
  const xAxisLabel = 'Time';

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([innerHeight, 0])
    .nice();

  const xScale = d3.scaleBand()
    .domain(data.map(xValue))
    .range([0, innerWidth])
    .paddingInner(0.1);
    // .nice();

  // console.log(yScale.domain());
  // console.log(yScale.range());
  // console.log(xScale.domain());
  // console.log(xScale.range());




  // new to try to add a line for selected time
  // fix mobile hovering in graph

  // const selectedMinute = useState(data[0]);
  // const [xCoord, setXCoord] = useState();

  // add check for if xCoord is defined
  // if (xCoord) {}

  // xScale.invert = function(x){ return d3.scaleQuantize().domain(this.range()).range(this.domain())(x);}

  // const hoveredMinuteXCoord = xScale.invert(xCoord);


  // tryout part 2
  // const datesArrayData = data.map(minute => (minute.dt));
  // const indexValueLeftOfXCoord = d3.bisectRight(datesArrayData, hoveredMinuteXCoord) - 1;
  // console.log(`closestDomainValueOfXCoord: ${indexValueLeftOfXCoord}`);

  // const hoveredTimeValue = data[indexValueLeftOfXCoord].dt;
  // const hoveredPrecipitationValue = data[indexValueLeftOfXCoord].precipitation;

  
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom 
            xScale={xScale} 
            innerHeight={innerHeight}
            // new
            innerWidth={innerWidth}
            yScale={yScale}

            tickFormat={xAxisTickFormat}
            tickOffset={10}
          />
        <text 
          className="axis-label" 
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft 
          yScale={yScale} 
          innerWidth={innerWidth} 
          tickOffset={10}
        />
        <text 
          className="axis-label" 
          x={innerWidth / 2} 
          y={innerHeight + xAxisLabelOffset} 
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks 
            data={data} 
            xScale={xScale} 
            yScale={yScale} 
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={4}
            innerHeight={innerHeight}
        />
        

        {/* new line tryout */}
        {/* <rect
          width={innerWidth} 
          height={innerHeight}
          fill="none"
          pointerEvents="all"
          onMouseMove={(event) => {
            setXCoord(d3.pointer(event)[0]);
          }}
        />
        
        <line 
          stroke="black"
          strokeWidth="4"
          x1={xScale(hoveredTimeValue) || xScale(selectedMinute.dt)} 
          x2={xScale(hoveredTimeValue) || xScale(selectedMinute.dt)} 
          y1={0} 
          y2={innerHeight} 
        >
        </line>
        <g>
          <circle 
            r={8} 
            fill="black" 
            cx={xScale(hoveredTimeValue)} 
            cy={yScale(hoveredPrecipitationValue)}
          />
          <rect 
            fill="black" 
            width={180} 
            height={65} 
            x={xScale(hoveredTimeValue) < (innerWidth / 2) 
                ? (xScale(hoveredTimeValue) + 10)
                : (xScale(hoveredTimeValue) - 190)
            } 
            y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
              ? (yScale(hoveredPrecipitationValue) + 10)
              : (yScale(hoveredPrecipitationValue) - 80)
            } 
            // y={yScale(hoveredPrecipitationValue) - 75}
          />
          <text fill="white" fontSize="14">
            <tspan 
              x={xScale(hoveredTimeValue) < (innerWidth / 2) 
                ? (xScale(hoveredTimeValue) + 20)
                : (xScale(hoveredTimeValue) - 180)
              } 
              y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
                ? (yScale(hoveredPrecipitationValue) + 35)
                : (yScale(hoveredPrecipitationValue) - 55)
              } 
            >
              Time: {xAxisTickFormat(hoveredTimeValue || selectedMinute.dt)}
            </tspan>
            <tspan 
              x={xScale(hoveredTimeValue) < (innerWidth / 2) 
                ? (xScale(hoveredTimeValue) + 20)
                : (xScale(hoveredTimeValue) - 180)
              }
              y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
                ? (yScale(hoveredPrecipitationValue) + 60)
                : (yScale(hoveredPrecipitationValue) - 30)
              } 
            >
              Precipitation: {(hoveredPrecipitationValue || "")}
            </tspan>
          </text>
        </g> */}

      </g>
    </svg>
  )
}