import * as d3 from 'd3';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { useState, useCallback, useMemo } from 'react';
import { VoronoiOverlay } from './VoronoiOverlay';

const xValue = d => d.date;
const yValue = d => d.deathTotal;

const margin = { top: 50, right: 40, bottom: 80, left: 100 };

export const LineChart = ({ data, width, height }) => {
  const [activeCountryName, setActiveCountryName] = useState();


  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const allData = useMemo(
    () => {
      return (data.reduce(
        (accumulator, countryTimeseries) => 
          accumulator.concat(countryTimeseries)) 
      )
    },
    [data]
  );

  const epsilon = 1;

  const xScale = useMemo(() => {
    return (
      d3.scaleTime()
        .domain(d3.extent(allData, xValue))
        .range([0, innerWidth])
    );
  }, [allData, innerWidth]);

  const yScale = useMemo(() => {
    return (
      d3.scaleLog()
        .domain([epsilon, d3.max(allData, yValue)])
        .range([innerHeight, 0])
    );
  }, [allData, innerHeight]);

  const lineGenerator = useMemo(() => {
    return (
      d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(epsilon + yValue(d)))
    );
  }, [xScale, yScale]);

  const mostRecentDate = xScale.domain()[1];

  console.log(activeCountryName);

  const handleVoronoiHover = useCallback(d => {
    setActiveCountryName(d.countryName);
  },[]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <YAxis yScale={yScale} innerWidth={innerWidth} />
        {
          data.map((countryTimeseries, id) => {
            return (
              <path 
                key={id} 
                className="marker-line"
                d={lineGenerator(countryTimeseries)} 
              />
            )
          })
        }
        { 
          activeCountryName 
          ? (<path 
              className="marker-line active"
              d={lineGenerator(data.find(countryTimeseries => 
                countryTimeseries.countryName === activeCountryName))} 
            />)
          : null
        }
        <text 
          transform={`translate(${innerWidth / 2},-10)`} 
          textAnchor="middle"
        >
          Coronavirus Global Deaths Over Time
        </text>
        <text 
          className="axis-label"
          transform={`translate(-40,${innerHeight / 2}) rotate(-90)`} 
          textAnchor="middle"
        >
          Cumulative Deaths
        </text>
        <text 
          className="axis-label"
          textAnchor="middle"
          dominantBaseline="hanging"
          transform={`translate(${innerWidth / 2},${innerHeight + 40})`} 
        >
          Time
        </text>
        <VoronoiOverlay 
          onHover={handleVoronoiHover} 
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          allData={allData}
          lineGenerator={lineGenerator}
        />
      </g>
    </svg>
  )
};
