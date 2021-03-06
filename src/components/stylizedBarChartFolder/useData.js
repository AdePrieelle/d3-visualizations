import { useState, useEffect } from 'react';
import * as d3 from 'd3';

const csvUrl =
    'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';
    // "https://gist.githubusercontent.com/AdePrieelle/82f887c8cff1aafde539fe76b7f8c41a/raw/df6bff7d18ce8a248e8f75f62dbcdfa9514b867a/UN_Population_2019.csv";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +(d['2020'] * 1000);
      return d;
    }
    d3.csv(csvUrl, row).then((data) => {
      console.log("Fetching data");
      setData(data.slice(0, 10));
    });
  }, [])
  
  return data;
}
