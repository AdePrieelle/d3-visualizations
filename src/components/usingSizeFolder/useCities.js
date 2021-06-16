import { useState, useEffect } from 'react';
import * as d3 from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';

export const useCities = () => {
  const [data, setData] = useState(null);

  const row = d => {
    d.lat = +d.lat;
    d.lng = +d.lng;
    d.population = +d.population;
    return d;
  }
  
  useEffect(() => {
    d3.csv(csvUrl, row).then(data => {
      setData(data);
    })
  }, []);
  
  return data;
}
