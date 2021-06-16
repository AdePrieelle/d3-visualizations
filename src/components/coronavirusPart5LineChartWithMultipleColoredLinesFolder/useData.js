import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { csv } from 'd3';

// old fixed commit
// const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/02be34e5ec0409835f79f61a547b2b42f2c6dfd7/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv';

// newer fixed commit video
const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/d1ed7ef35690594a918ed5fe1ffb6a75266d2c1f/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

// live commit
// const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
  
const sum = (accumulator, currentValue) => accumulator + currentValue;

const dateSpecifier = "%m/%d/%y";
const parseDate = d3.timeParse(dateSpecifier);

const transform = rawData => {

  // Filter out rows that represent provinces or states
  const countriesData = rawData.filter(d => !d['Province/State']);

  // Get timeseries data for each country
  const days = rawData.columns.slice(4);
  return countriesData.map(d => {
    // const countryName = d['Country/Region'];
    return days.map(day => ({
        date: parseDate(day),
        deathTotal: +d[day]
    }));
  });
}

export const useData = () => {
  const [data, setData] = useState();

  console.log(data);

  useEffect(() => {
    csv(csvUrl).then(rawData => {
      setData(transform(rawData));
    });
  }, []);
  return data;
};
