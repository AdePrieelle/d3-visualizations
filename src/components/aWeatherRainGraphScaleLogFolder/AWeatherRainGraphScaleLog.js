import * as d3 from 'd3';
import { exampleWeatherRainData2 } from './exampleWeatherRainData2';
import { Marks } from './Marks';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { AxisOuterLines } from './AxisOuterLines';
import { AxisCurrentTimeLabel } from './AxisCurrentTimeLabel';
import { SelectTimeOverlay } from './SelectTimeOverlay';
import { useSvgWrapperSize } from './useSvgWrapperSize';
import './AWeatherRainGraphScaleLog.css';

const margin = { top: 30, right: 20, bottom: 40, left: 80 };
const marginLeft = margin.left;
const extraMarginLeftLarge = 30;
const extraMarginLeftMedium = 20;
const axisCurrentTimeLabelXOffset = 0;
const axisCurrentTimeLabelYOffset = 5;
const axisCurrentTimeTextLabel = "Now";
const selectTimeOverLayRectRightPadding = 14;
const axisLeftTickOffset = 10;
const widthBreakpointSmall = 480;
const widthBreakpointMedium = 700;
const widthBreakpointLarge = 900;
const axisBottomTicksAmountLarge = 12;
const axisBottomTicksAmountSmall = 4;
const axisBottomTickPaddingLarge = 16;
const axisBottomTickPaddingMedium = 12;
const axisBottomTickPaddingSmall = 10;
const xAxisTickFormat = d3.utcFormat("%H:%M");

const timezoneOffsetValue = -14400;

export const AWeatherRainGraphScaleLog = ({
  weatherRainData = exampleWeatherRainData2, 
  timezoneOffset = timezoneOffsetValue
}) => {
  const [width, height] = useSvgWrapperSize();
  
  if(!weatherRainData) {
    return <pre style={{fontSize: "1em"}}>Loading...</pre>
  }

  const dataTimezoneOffsetInMilliseconds = weatherRainData.map((minute) => (
    {
      dt: ((minute.dt+timezoneOffset)*1000),
      precipitation: minute.precipitation
    }
  ));
  const data = dataTimezoneOffsetInMilliseconds;

  const calculateMarginLeft = (width) => {
    if (width >= widthBreakpointLarge) {
      return marginLeft + extraMarginLeftLarge;
    } else if (width >= widthBreakpointSmall) {
      return marginLeft + extraMarginLeftMedium;
    } else {
      return marginLeft;
    }
  }
  margin.left = calculateMarginLeft(width);


  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = d => d.precipitation;
  const xValue = d => d.dt;

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
            width={width}
            xScale={xScale} 
            innerHeight={innerHeight}
            xAxisTickFormat={xAxisTickFormat}
            widthBreakpointSmall={widthBreakpointSmall}
            widthBreakpointMedium={widthBreakpointMedium}
            widthBreakpointLarge={widthBreakpointLarge}
            axisBottomTicksAmountLarge={axisBottomTicksAmountLarge}
            axisBottomTicksAmountSmall={axisBottomTicksAmountSmall}
            axisBottomTickPaddingLarge={axisBottomTickPaddingLarge}
            axisBottomTickPaddingMedium={axisBottomTickPaddingMedium}
            axisBottomTickPaddingSmall={axisBottomTickPaddingSmall}
          />
          <AxisLeft 
            yScale={yScale} 
            innerWidth={innerWidth} 
            axisLeftTickOffset={axisLeftTickOffset}
            rainIntensity={rainIntensity}
          />
          <Marks 
            data={data} 
            xScale={xScale} 
            yScale={yScale} 
            xValue={xValue}
            yValue={yValue}
            innerHeight={innerHeight}
          />
          <SelectTimeOverlay 
            data={data}
            xScale={xScale}
            yScale={yScale}
            width={width}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            rainIntensity={rainIntensity}
            xAxisTickFormat={xAxisTickFormat}
            selectTimeOverLayRectRightPadding={selectTimeOverLayRectRightPadding}
            widthBreakpointSmall={widthBreakpointSmall}
            widthBreakpointMedium={widthBreakpointMedium}
          />
        </g>
      </svg>
    </div>
  )
}
