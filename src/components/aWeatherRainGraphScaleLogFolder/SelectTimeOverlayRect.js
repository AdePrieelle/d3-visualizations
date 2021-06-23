import * as d3 from 'd3';

export const SelectTimeOverlayRect = ({ 
  innerWidth, 
  innerHeight, 
  setXCoord,
  selectTimeOverLayRectRightPadding
}) => {
  const calculateMouseXCoordValue = (event) => {
    const rectMouseXCoordValue = d3.pointer(event)[0];
    if (rectMouseXCoordValue < 0) {
      return 0;
    } else if (rectMouseXCoordValue > innerWidth) {
      return innerWidth;
    } else {
      return rectMouseXCoordValue;
    }
  }

  const calculateTouchXCoordValue = (event) => {
    const rectTouchXCoordValue = d3.pointer(event.touches[0], event.target)[0];
    if (rectTouchXCoordValue < 0) {
      return 0;
    } else if (rectTouchXCoordValue > innerWidth) {
      return innerWidth;
    } else {
      return rectTouchXCoordValue;
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
