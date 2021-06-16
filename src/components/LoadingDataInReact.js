// 7. Loading Data in React
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// import { csv, csvFormat } from 'd3';


export const LoadingDataInReact = () => {
  const csvUrl =
      "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";
    // "https://gist.githubusercontent.com/AdePrieelle/9dad0c2cc847e2986d375e131fd9ece6/raw/cssNamedColors.csv";
  
  const message = data => {
    let message = "";
    message =
      message + Math.round(d3.csvFormat(data).length / 1024) + " kB\n";
    message = message + data.length + " rows\n";
    message = message + data.columns.length + " columns";
    return message;
  }
  
  const [data, setData] = useState(null);

  useEffect(() => {
    // With d3.csv
    d3.csv(csvUrl).then((data) => {
      console.log("Fetching data");
      setData(data);
    });
  }, [])

  
  return (
    <pre style={{fontSize: "7em"}}>{data ? message(data) : 'Loading...'}</pre>
  );
};