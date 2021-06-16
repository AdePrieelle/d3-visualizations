import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { csv } from 'd3';

const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/02be34e5ec0409835f79f61a547b2b42f2c6dfd7/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv';

// const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
  
const sum = (accumulator, currentValue) => accumulator + currentValue;

const dateSpecifier = "%m/%d/%y";
const parseDate = d3.timeParse(dateSpecifier);

const transform = rawData => {
  const days = rawData.columns.slice(4);
  return days.map(day => ({
      date: parseDate(day),
      deathTotal: rawData.map(d => +d[day]).reduce(sum, 0)
  }))
}

export const useData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    csv(csvUrl).then(rawData => {
      setData(transform(rawData));
    });
  }, []);
  return data;
};
