import { AxisLeftTick } from './AxisLeftTick';

export const AxisLeft= ({ 
  yScale, 
  innerWidth, 
  tickOffsetAxisLeft,
  rainIntensity
 }) => {
  return (
    <g className="axis">
      {/* always render one rain intensity level tick above current max rain intensity value */}
      <AxisLeftTick 
        rainIntensityValue={'Light rain'}
        yScale={yScale}
        rainIntensity={rainIntensity}
        innerWidth={innerWidth}
        tickOffsetAxisLeft={tickOffsetAxisLeft}
      />
      <AxisLeftTick 
        rainIntensityValue='Moderate rain' 
        yScale={yScale}
        rainIntensity={rainIntensity}
        innerWidth={innerWidth}
        tickOffsetAxisLeft={tickOffsetAxisLeft}
      />
      {(yScale.domain()[1] > rainIntensity['Moderate rain'])
        ? <AxisLeftTick 
            rainIntensityValue='Heavy rain' 
            yScale={yScale}
            rainIntensity={rainIntensity}
            innerWidth={innerWidth}
            tickOffsetAxisLeft={tickOffsetAxisLeft}
          />
        : null
      }
      {(yScale.domain()[1] > rainIntensity['Heavy rain'])
        ? <AxisLeftTick 
            rainIntensityValue='Violent rain' 
            yScale={yScale}
            rainIntensity={rainIntensity}
            innerWidth={innerWidth}
            tickOffsetAxisLeft={tickOffsetAxisLeft}
          />
        : null
      }
    </g>
  )
}
