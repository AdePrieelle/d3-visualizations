import { AxisLeftTick } from './AxisLeftTick';

export const AxisLeft= ({ 
  yScale, 
  innerWidth, 
  axisLeftTickOffset,
  rainIntensity
 }) => {
  return (
    <g className="axis">
      {/* always render one rain intensity level tick above current max rain intensity value if yScale .nice() is removed */}
      <AxisLeftTick 
        rainIntensityValue={'Light rain'}
        yScale={yScale}
        rainIntensity={rainIntensity}
        innerWidth={innerWidth}
        axisLeftTickOffset={axisLeftTickOffset}
      />
      <AxisLeftTick 
        rainIntensityValue='Moderate rain' 
        yScale={yScale}
        rainIntensity={rainIntensity}
        innerWidth={innerWidth}
        axisLeftTickOffset={axisLeftTickOffset}
      />
      {(yScale.domain()[1] > rainIntensity['Moderate rain'])
        ? <AxisLeftTick 
            rainIntensityValue='Heavy rain' 
            yScale={yScale}
            rainIntensity={rainIntensity}
            innerWidth={innerWidth}
            axisLeftTickOffset={axisLeftTickOffset}
          />
        : null
      }
      {(yScale.domain()[1] > rainIntensity['Heavy rain'])
        ? <AxisLeftTick 
            rainIntensityValue='Violent rain' 
            yScale={yScale}
            rainIntensity={rainIntensity}
            innerWidth={innerWidth}
            axisLeftTickOffset={axisLeftTickOffset}
          />
        : null
      }
    </g>
  )
}
