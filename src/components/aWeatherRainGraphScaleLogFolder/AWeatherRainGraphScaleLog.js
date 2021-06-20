import * as d3 from 'd3';
import { exampleWeatherRainData } from './exampleWeatherRainData';
import { Marks } from './Marks';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
// import { AxisBottomLabel } from './AxisBottomLabel';
// import { AxisLeftLabel } from './AxisLeftLabel';
import { AxisOuterLines } from './AxisOuterLines';
import { AxisCurrentTimeLabel } from './AxisCurrentTimeLabel';
import { SelectTimeOverlay } from './SelectTimeOverlay';
import './AWeatherRainGraphScaleLog.css';
import { useSvgWrapperSize } from './useSvgWrapperSize';

// const width = 960;
// const height = 500;
const margin = { top: 30, right: 20, bottom: 40, left: 80 };
// const xAxisLabelOffset = 60;
// const yAxisLabelOffset = 90;
const axisCurrentTimeLabelXOffset = 0;
const axisCurrentTimeLabelYOffset = 5;
const axisCurrentTimeTextLabel = "Now";

const marginLeft = margin.left;

export const AWeatherRainGraphScaleLog = () => {
  const [width, height] = useSvgWrapperSize();

  const calculateMarginLeft = (width) => {
    if (width >= 900) {
      return marginLeft + 30;
    } else if (width >= 480) {
      return marginLeft + 20;
    } else {
      return marginLeft;
    }
  }
  margin.left = calculateMarginLeft(width);

  if(!exampleWeatherRainData) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }
  
  // prob 2pm local timezone when we grabbed the exampleWeatherRainData
  // getting from 13:47 my time but need to adjust to local timezone time?
  const dataInMiliseconds = exampleWeatherRainData.map(minute => (
    {
      dt: minute.dt*1000,
      precipitation: minute.precipitation
    }
  ));
  const data = dataInMiliseconds;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xAxisTickFormat = d3.timeFormat("%H:%M");

  const yValue = d => d.precipitation;
  // const yAxisLabel = 'Precipitation in mm';
  const xValue = d => d.dt;
  // const xAxisLabel = 'Time';

  const dataDomainMax = d3.max(data, yValue);
  const rainIntensity = {
    "No rain": 0,
    "Light rain": 0,
    "Moderate rain": 2.5,
    "Heavy rain": 7.6,
    "Violent rain": 50,
  }

  const calculateMaxYScaleDomain = (dataDomainMax, rainIntensity) => {
    if (dataDomainMax >= rainIntensity["Heavy rain"]) {
      return Math.max(dataDomainMax, rainIntensity["Violent rain"]);
    } else if (dataDomainMax >= rainIntensity["Moderate rain"]) {
      return Math.max(dataDomainMax, rainIntensity["Heavy rain"]);
    } else {
      return Math.max(dataDomainMax, rainIntensity["Moderate rain"]);
    }
  }

  const maxYScaleDomain = calculateMaxYScaleDomain(dataDomainMax, rainIntensity);
  const epsilon = 0.1;

  const yScale = d3.scaleLog()
    .domain([epsilon, maxYScaleDomain])
    .range([innerHeight, 0])
    .clamp(true)
    .nice();

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);

  return (
    <div className="svg-wrapper">
      <svg className="svg-graph">
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisOuterLines 
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
          <AxisCurrentTimeLabel 
            axisCurrentTimeLabelXOffset={axisCurrentTimeLabelXOffset}
            axisCurrentTimeLabelYOffset={axisCurrentTimeLabelYOffset}
            axisCurrentTimeTextLabel={axisCurrentTimeTextLabel}
          />
          <AxisBottom 
            xScale={xScale} 
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={10}
          />
          {/* <AxisBottomLabel
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            xAxisLabelOffset={xAxisLabelOffset}
            xAxisLabel={xAxisLabel}
          /> */}
          <AxisLeft 
            yScale={yScale} 
            innerWidth={innerWidth} 
            tickOffset={10}
            rainIntensity={rainIntensity}
          />
          {/* <AxisLeftLabel
            yAxisLabelOffset={yAxisLabelOffset}
            innerHeight={innerHeight}
            yAxisLabel={yAxisLabel}
          /> */}
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
          <SelectTimeOverlay 
            data={data}
            xScale={xScale}
            yScale={yScale}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            rainIntensity={rainIntensity}
            xAxisTickFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    </div>
  )
}
