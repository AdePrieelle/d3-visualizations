// CoronaVirus Part 4 Subpart 1 Linear Y Axis (with React and D3)
// import * as d3 from 'd3';
import './CoronavirusPart4Subpart1LinearYAxis.css';
import { useData } from './useData';
import { LineChart } from './LineChart';

const width = window.innerWidth;
const height = window.innerHeight;

export const CoronavirusPart4Subpart1LinearYAxis = () => {
  const data = useData();
  
  return (
    data 
    ? <LineChart data={data} width={width} height={height} />
    : <div>Loading...</div>
  );
}
