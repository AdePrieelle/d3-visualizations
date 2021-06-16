import * as d3 from 'd3';
import { exampleWeatherRainData } from './exampleWeatherRainData';
import { Marks } from './Marks';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import './AWeatherRainGraphScaleLog.css';
import { useState } from 'react';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 80, left: 130 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 90;

export const AWeatherRainGraphScaleLog = () => {
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

  // new AxisLeft ticks
  const dataDomainMax = d3.max(data, yValue);
  let maxYScaleDomain;
  if (dataDomainMax >= 7.6) {
    maxYScaleDomain = Math.max(dataDomainMax, 50);
  } else if (dataDomainMax >= 2.5) {
    maxYScaleDomain = Math.max(dataDomainMax, 7.6);
  } else {
    maxYScaleDomain = Math.max(dataDomainMax, 2.5);
  }
  // console.log(maxYScaleDomain);

  const yScale = d3.scaleLog()
    // .domain([0, d3.max(data, yValue)])
    .domain([0.001, maxYScaleDomain])
    .range([innerHeight, 0])
    .clamp(true)
    .nice();

  // console.log(yScale.domain()[1]);

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    // .nice();

  // console.log(yScale.domain());
  // console.log(yScale.range());
  // console.log(xScale.domain());
  // console.log(xScale.range());


  // new to try to add a line for selected time
  // fix mobile hovering in graph

  const selectedMinute = useState(data[0]);
  const [xCoord, setXCoord] = useState();

  // add check for if xCoord is defined
  // if (xCoord) {}

  const hoveredMinuteXCoord = xScale.invert(xCoord);

  // tryout part 2
  const datesArrayData = data.map(minute => (minute.dt));
  const indexValueLeftOfXCoord = d3.bisectRight(datesArrayData, hoveredMinuteXCoord) - 1;

  const hoveredTimeValue = data[indexValueLeftOfXCoord].dt;
  const hoveredPrecipitationValue = data[indexValueLeftOfXCoord].precipitation;

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom 
            xScale={xScale} 
            innerHeight={innerHeight}
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
        /> */}
        
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
            fill="rgba(0,0,0,0.8)" 
            width={190} 
            height={65} 
            rx={12}
            ry={12}
            x={xScale(hoveredTimeValue) < (innerWidth / 2) 
                ? (xScale(hoveredTimeValue) + 10)
                : (xScale(hoveredTimeValue) - 200)
            } 
            y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
              ? (yScale(hoveredPrecipitationValue) + 10)
              : (yScale(hoveredPrecipitationValue) - 80)
            } 
          />
          <text fill="white" fontSize="14">
            <tspan className="tspan-precipitation-text"
              x={xScale(hoveredTimeValue) < (innerWidth / 2) 
                ? (xScale(hoveredTimeValue) + 20)
                : (xScale(hoveredTimeValue) - 190)
              }
              y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
                ? (yScale(hoveredPrecipitationValue) + 35)
                : (yScale(hoveredPrecipitationValue) - 55)
              } 
            >
              {
                  (hoveredPrecipitationValue === 0)
                ? 'no rain'
                : (hoveredPrecipitationValue >= 50)
                ? 'violent rain'
                : (hoveredPrecipitationValue >= 7.6)
                ? 'Heavy rain'
                : (hoveredPrecipitationValue >= 2.5)
                ? 'Moderate rain'
                : (hoveredPrecipitationValue > 0)
                ? 'Light rain'
                : null
              }
            </tspan>
            <tspan className="tspan-time"
              x={xScale(hoveredTimeValue) < (innerWidth / 2) 
                ? (xScale(hoveredTimeValue) + 155)
                : (xScale(hoveredTimeValue) - 55)
              } 
              y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
                ? (yScale(hoveredPrecipitationValue) + 35)
                : (yScale(hoveredPrecipitationValue) - 55)
              } 
            >
              {xAxisTickFormat(hoveredTimeValue || selectedMinute.dt)}
            </tspan>
            <tspan className="tspan-precipitation-number"
              x={xScale(hoveredTimeValue) < (innerWidth / 2) 
                ? (xScale(hoveredTimeValue) + 20)
                : (xScale(hoveredTimeValue) - 190)
              }
              y={yScale(hoveredPrecipitationValue) < (innerHeight / 2) 
                ? (yScale(hoveredPrecipitationValue) + 60)
                : (yScale(hoveredPrecipitationValue) - 30)
              } 
            >
              {hoveredPrecipitationValue} mm per hour
            </tspan>
            
          </text>
        </g>
        <line stroke="#c0c0bb" y2={innerHeight} />
        <line stroke="#c0c0bb" x2={innerWidth} />
        <line stroke="#c0c0bb" x1={innerWidth} x2={innerWidth} y2={innerHeight} />
        <rect
          width={innerWidth} 
          height={innerHeight}
          fill="none"
          pointerEvents="all"
          onMouseMove={(event) => {
            setXCoord(d3.pointer(event)[0]);
          }}
        />
      </g>
    </svg>
  )
}
