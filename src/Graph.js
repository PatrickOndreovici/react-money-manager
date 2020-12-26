import React, {useEffect, useState} from 'react';
import './Graph.css';
import {Line} from 'react-chartjs-2';
import exchangeRatesApi from './exchangeRatesApi';

function Graph() {
  const [currency, setCurrency] = useState("EUR");
  const [data, setData] = useState({
    labels: ['other day', 'yesterday', 'today'],
    datasets: [
      {
        label: 'My First dataset',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [100, 100, 100]
      }
    ]
  });
  useEffect(() => {

  }, [data]);
  return (
    <div className="graph">
      <h1>graph</h1>
      <select style = {{margin: "auto"}}>
        <option>EUR</option>
        <option>RON</option>
      </select>
      <div style={{ position: "relative", margin: "auto", width: "70vw", height: "500px"}}>
       <Line data={data} options={{
            maintainAspectRatio : false
          }}/>
      </div>
    </div>
  );
}

export default Graph;
