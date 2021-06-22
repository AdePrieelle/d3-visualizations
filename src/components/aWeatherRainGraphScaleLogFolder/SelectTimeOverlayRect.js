import * as d3 from 'd3';

export const SelectTimeOverlayRect = ({ 
  innerWidth, 
  innerHeight, 
  setXCoord,
  selectTimeOverLayRectRightPadding
}) => {
  const calculateMouseXCoordValue = (event) => {
    if ((d3.pointer(event)[0]) < 0) {
      return 0;
    } else if ((d3.pointer(event)[0]) > innerWidth) {
      return innerWidth;
    } else {
      return (d3.pointer(event)[0]);
    }
  }

  const calculateTouchXCoordValue = (event) => {
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
      width={innerWidth + selectTimeOverLayRectRightPadding} 
      height={innerHeight}
      onMouseMove={(event) => {
        const mouseXCoordValue = calculateMouseXCoordValue(event);
        setXCoord(mouseXCoordValue);
      }}
      onMouseLeave={() => {
        setXCoord(null);
      }}
      onTouchMove={(event) => {
        const touchXCoordValue = calculateTouchXCoordValue(event);
        setXCoord(touchXCoordValue);
      }}
    />
  )
}
