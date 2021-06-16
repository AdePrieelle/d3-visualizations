// Coronavirus Basic Line Chart (with React and D3)
// import * as d3 from 'd3';
import './CoronavirusBasicLineChart.css';
import { useData } from './useData';
import { LineChart } from './LineChart';

const width = window.innerWidth;
const height = window.innerHeight;

export const CoronavirusBasicLineChart = () => {
  const data = useData();
  
  return (
    data 
    ? <LineChart data={data} width={width} height={height} />
    : <div>Loading...</div>
  );
}
