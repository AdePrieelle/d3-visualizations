// CoronaVirus Part 6 Line Chart with Voronoi Overlay (with React and D3)
// import * as d3 from 'd3';
import './CoronavirusPart6LineChartWithVoronoiOverlay.css';
import { useData } from './useData';
import { LineChart } from './LineChart';

const width = window.innerWidth;
const height = window.innerHeight;

export const CoronavirusPart6LineChartWithVoronoiOverlay = () => {
  const data = useData();
  
  return (
    data 
    ? <LineChart data={data} width={width} height={height} />
    : <div>Loading...</div>
  );
}
