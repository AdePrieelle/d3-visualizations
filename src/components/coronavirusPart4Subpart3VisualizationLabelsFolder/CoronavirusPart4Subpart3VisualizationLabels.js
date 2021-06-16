// CoronaVirus Part 4 Subpart 3 Visualization Labels (with React and D3)
// import * as d3 from 'd3';
import './CoronavirusPart4Subpart3VisualizationLabels.css';
import { useData } from './useData';
import { LineChart } from './LineChart';

const width = window.innerWidth;
const height = window.innerHeight;

export const CoronavirusPart4Subpart3VisualizationLabels = () => {
  const data = useData();
  
  return (
    data 
    ? <LineChart data={data} width={width} height={height} />
    : <div>Loading...</div>
  );
}
