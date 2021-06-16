// Coronavirus Part 2 Line Chart with Marker Lines (with React and D3)
// import * as d3 from 'd3';
import './CoronavirusPart2LineChartWithMarkerLines.css';
import { useData } from './useData';
import { LineChart } from './LineChart';

const width = window.innerWidth;
const height = window.innerHeight;

export const CoronavirusPart2LineChartWithMarkerLines = () => {
  const data = useData();
  
  return (
    data 
    ? <LineChart data={data} width={width} height={height} />
    : <div>Loading...</div>
  );
}
