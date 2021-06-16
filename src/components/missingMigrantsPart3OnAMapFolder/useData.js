import { useState, useEffect } from 'react';
import * as d3 from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';

const row = d => {
  d.coords = d['Location Coordinates'].split(",").map(d => +d).reverse();
  d['Total Dead and Missing'] = +d['Total Dead and Missing'];
  return d;
}

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv(csvUrl, row).then(data => {
      setData(data);
    })
  }, []);
  
  return data;
}
