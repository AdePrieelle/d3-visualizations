import { useState, useEffect } from 'react';
import * as d3 from 'd3';

const csvUrl = 'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-3/slim-3.csv';

export const useCodes = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv(csvUrl).then(data => {
      setData(data);
    })
  }, []);
  
  return data;
}
