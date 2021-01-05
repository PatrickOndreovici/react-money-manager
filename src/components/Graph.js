import React, {useEffect, useState} from 'react';
import {Line, Doughnut} from 'react-chartjs-2';
import exchangeRatesApi from '../exchangeRatesApi';
import currencies from './currencies';
import './Graph.css';
import TopCategories from './TopCategories';
import LineGraph from './LineGraph';

function Graph() {
  // current currency used to display data on graph
  const [currency, setCurrency] = useState("EUR");
  
  // graph data for 3 days
  const [data, setData] = useState({
    labels: ['other day', 'yesterday', 'today'],
    datasets: [
      {
        label: 'Last 3 days',
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
        data: [0, 0, 0]
      }
    ]
  });
  
  const changeCurrency = (event) => {
    setCurrency(event.target.value);
  }

  const displayCurrencyOptions = () => {
    const arrayOfOptions = [];
    for (let i = 0; i < currencies.length; ++i){
      arrayOfOptions.push(<option key = {i}>{currencies[i]}</option>);
    }
    return arrayOfOptions;
  }

  return (
    <div className="graph">
      <select style = {{margin: "auto", marginTop: "40px"}} onChange = {changeCurrency}>
        {displayCurrencyOptions()}
      </select>
      <LineGraph key = {currency + "1line"} numberOfMonths = {4} currency = {currency}></LineGraph>
      <div className = "categories">
        <TopCategories key = {currency + "1"} currency = {currency} numberOfCategories = {3}></TopCategories>
        <TopCategories key = {currency + "2"} currency = {currency} numberOfCategories = {5}></TopCategories>
      </div>
    </div>
  );
}

export default Graph;
