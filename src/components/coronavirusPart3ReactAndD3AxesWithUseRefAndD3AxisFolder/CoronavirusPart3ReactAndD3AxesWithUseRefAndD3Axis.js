// Coronavirus Part 3 React and D3 Axes with useRef and d3 axis (with React and D3)
// import * as d3 from 'd3';
import './CoronavirusPart3ReactAndD3AxesWithUseRefAndD3Axis.css';
import { useData } from './useData';
import { LineChart } from './LineChart';

const width = window.innerWidth;
const height = window.innerHeight;

export const CoronavirusPart3ReactAndD3AxesWithUseRefAndD3Axis = () => {
  const data = useData();
  
  return (
    data 
    ? <LineChart data={data} width={width} height={height} />
    : <div>Loading...</div>
  );
}
