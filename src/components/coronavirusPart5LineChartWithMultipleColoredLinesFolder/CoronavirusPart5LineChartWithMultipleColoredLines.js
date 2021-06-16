// CoronaVirus Part 5 Line Chart with Mutiple Colored Lines (with React and D3)
// import * as d3 from 'd3';
import './CoronavirusPart5LineChartWithMultipleColoredLines.css';
import { useData } from './useData';
import { LineChart } from './LineChart';

const width = window.innerWidth;
const height = window.innerHeight;

export const CoronavirusPart5LineChartWithMultipleColoredLines = () => {
  const data = useData();
  
  return (
    data 
    ? <LineChart data={data} width={width} height={height} />
    : <div>Loading...</div>
  );
}
