import * as d3 from 'd3';

export const SelectTimeOverlayRect = ({ innerWidth, innerHeight, setXCoord }) => {
  return (
    <rect
      className="select-time-overlay-rect"
      width={innerWidth} 
      height={innerHeight}
      onMouseMove={(event) => {
        setXCoord(d3.pointer(event)[0]);
      }}
      // onMouseLeave causes flickering because this component gets rerendered when setXCoord is triggered
      // onMouseLeave={() => {
      //   setXCoord(null);
      // }}
    />
  )
}
