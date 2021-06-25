export const dataTimezoneOffsetInMilliseconds = (weatherRainData, timezoneOffset) => {
  return (
    weatherRainData.map((minute) => (
      {
        dt: ((minute.dt + timezoneOffset) * 1000),
        precipitation: minute.precipitation
      }
    ))
  )
};

export const calculateBreakpointSizeMarginLeft = (
  width,
  widthBreakpointLarge,
  widthBreakpointSmall,
  marginLeftLarge,
  marginLeftMedium,
  marginLeftSmall
) => {
  if (width >= widthBreakpointLarge) {
    return marginLeftLarge;
  } else if (width >= widthBreakpointSmall) {
    return marginLeftMedium;
  } else {
    return marginLeftSmall;
  }
};

export const rainIntensityLevels = {
  "No rain": 0,
  "Light rain": 0,
  "Moderate rain": 2.5,
  "Heavy rain": 7.6,
  "Violent rain": 50,
};

export const calculateMaxYScaleDomain = (dataDomainMax, rainIntensity) => {
  if (dataDomainMax >= rainIntensity["Heavy rain"]) {
    return Math.max(dataDomainMax, rainIntensity["Violent rain"]);
  } else if (dataDomainMax >= rainIntensity["Moderate rain"]) {
    return Math.max(dataDomainMax, rainIntensity["Heavy rain"]);
  } else {
    return Math.max(dataDomainMax, rainIntensity["Moderate rain"]);
  }
};
