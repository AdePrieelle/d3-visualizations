import { useLayoutEffect, useState } from 'react';

// custom react hook to get the width and height of a DOM node
export const useSvgWrapperSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const svgWrapper = document.querySelector('.svg-wrapper');
    const updateSize = () => {
      setSize([svgWrapper.clientWidth, svgWrapper.clientHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
