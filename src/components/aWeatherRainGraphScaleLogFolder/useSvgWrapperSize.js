import { useLayoutEffect, useState } from 'react';

export const useSvgWrapperSize = () => {
  const [size, setWidth] = useState([0, 0]);
  useLayoutEffect(() => {
    const svgWrapper = document.querySelector('.svg-wrapper');
    const updateSize = () => {
      setWidth([svgWrapper.clientWidth, svgWrapper.clientHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
