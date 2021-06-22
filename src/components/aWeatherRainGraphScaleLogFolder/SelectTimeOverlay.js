import { useState } from 'react';
import * as d3 from 'd3';
import { SelectTimeOverlayLine } from './SelectTimeOverlayLine';
import { SelectTimeOverlayRect } from './SelectTimeOverlayRect';
import { SelectTimeOverlayTooltip } from './SelectTimeOverlayTooltip';

export const SelectTimeOverlay = ({
  data,
  xScale,
  yScale,
  innerWidth,
  innerHeight,
  rainIntensity,
  xAxisTickFormat,
  selectTimeOverLayRectRightPadding
}) => {
  const [xCoord, setXCoord] = useState(null);
  const hoveredMinuteXCoord = xScale.invert(xCoord);
  const datesArrayData = data.map(minute => (minute.dt));
  const indexValueLeftOfXCoord = d3.bisectRight(datesArrayData, hoveredMinuteXCoord) - 1;
  const hoveredTimeValue = data[indexValueLeftOfXCoord].dt;
  const hoveredPrecipitationValue = data[indexValueLeftOfXCoord].precipitation;

  return (
    <>
      {xCoord !== null &&
          <SelectTimeOverlayTooltip 
            xScale={xScale}
            yScale={yScale}
            hoveredTimeValue={hoveredTimeValue}
            hoveredPrecipitationValue={hoveredPrecipitationValue}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            rainIntensity={rainIntensity}
            xAxisTickFormat={xAxisTickFormat}
          />
        }

        {xCoord !== null &&
          <SelectTimeOverlayLine 
            xScale={xScale}
            hoveredTimeValue={hoveredTimeValue}
            innerHeight={innerHeight}
          />
        }

        <SelectTimeOverlayRect 
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          setXCoord={setXCoord}
          selectTimeOverLayRectRightPadding={selectTimeOverLayRectRightPadding}
        />

    </>
  )
}
