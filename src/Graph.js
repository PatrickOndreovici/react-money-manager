import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import exchangeRatesApi from './exchangeRatesApi';
import currencies from './currencies';
import './Graph.css';

function Graph() {
  console.log(currencies);
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



  useEffect(() => {
    const changeToCurrentCurrency = async () => {
      const dataCurrency = await exchangeRatesApi(currency);
      if (localStorage.length !== 0){
        modifyData(dataCurrency);
      }
    }
    changeToCurrentCurrency();
  }, [currency]);



  const changeCurrency = (event) => {
    setCurrency(event.target.value);
  }

  const getTotalProfit = (parsedHistory, type, date, money, aux) => {
    if (parsedHistory[type][date] !== undefined){
      for (let i = 0; i < parsedHistory[type][date].length; ++i){
        const v = parsedHistory[type][date][i];
        for (let j = 0; j < v.length; ++j){
          let amount = Number(v[j][1]);
          let curr = v[j][2];
          if (money[curr] === undefined){
            money[curr] = 0;
          }
          money[curr] += amount * aux;
        }
      }
    }
  }



  const getCost = (money, rates) => {
    let cost = 0;
    if (money["EUR"] === undefined) money["EUR"] = 0;
    if (money["RON"] === undefined) money["RON"] = 0;
    for (let i = 0; i < currencies.length; ++i){
      if (money[currencies[i]] === undefined){
        money[currencies[i]] = 0;
      }
      if (currency === currencies[i]){
        cost += Number(money[currencies[i]]);
      }
      else{
        cost += Number(money[currencies[i]]) / Number(rates[currencies[i]]);
      }
    }
    return cost.toFixed(2);
  }
  const modifyData = (rates) => {
    let history = localStorage.getItem('history');
    if (history === null){
      return;
    }
    const auxData = {...data};
    auxData.datasets[0].data = [];
    let parsedHistory = JSON.parse(history);
    console.log(parsedHistory);
    let today = new Date();
    let yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toLocaleDateString();
    let otherDay = new Date(today);
    otherDay.setDate(otherDay.getDate() - 2);
    otherDay = otherDay.toLocaleDateString();
    today = today.toLocaleDateString();
    let money = {};
    getTotalProfit(parsedHistory, "income", otherDay, money, 1);
    getTotalProfit(parsedHistory, "expense", otherDay, money, -1);
    let total = getCost(money, rates);
    auxData.datasets[0].data.push(total);

    money = {};
    getTotalProfit(parsedHistory, "income", yesterday, money, 1);
    getTotalProfit(parsedHistory, "expense", yesterday, money, -1);
    total = getCost(money, rates);
    auxData.datasets[0].data.push(total);

    money = {};
    getTotalProfit(parsedHistory, "income", today, money, 1);
    getTotalProfit(parsedHistory, "expense", today, money, -1);
    console.log(money);
    total = getCost(money, rates);
    auxData.datasets[0].data.push(total);
    setData(auxData);
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
      <div style={{ position: "relative", margin: "auto", width: "70vw", height: "500px"}}>
       <Line data={data} options={{
            maintainAspectRatio : false
          }}/>
      </div>
    </div>
  );
}

export default Graph;
