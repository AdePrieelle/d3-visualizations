import * as d3 from 'd3';

export const SelectTimeOverlayRect = ({ 
  innerWidth, 
  innerHeight, 
  setXCoord
}) => {
  const calculateXCoordValue = (event) => {
    if ((d3.pointer(event.touches[0], event.target)[0]) < 0) {
      return 0;
    } else if ((d3.pointer(event.touches[0], event.target)[0]) > innerWidth) {
      return innerWidth;
    } else {
      return (d3.pointer(event.touches[0], event.target)[0]);
    }
  }

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


      // d3.pointer target default to currentTarget which is null with onTouchMove,
      // "target" is the one that needs to be set as the target in d3.pointer
      onTouchMove={(event) => {
        // console.log(d3.pointer(event.touches[0], event.target)[0]);
        console.log(d3.pointer(event.touches[0], event.target)[0]);
        const xCoordValue = calculateXCoordValue(event);
        console.log(xCoordValue);
        setXCoord(xCoordValue);
        // setXCoord(d3.pointer(event.touches[0], event.target)[0]);
        // setXCoord(d3.pointer(event.touches[0], event.target)[0]);
        // setXCoord(d3.pointer(event.touches[0], event.target)[0]);
        // console.log(event.touches[0]);
      }}
    />
  )
}
