import './TopCategories.css';
import {Doughnut} from 'react-chartjs-2';
import React, {useState, useEffect} from 'react';
import exchangeRatesApi from '../exchangeRatesApi';
import { getDefaultNormalizer } from '@testing-library/react';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { defaults } from 'react-chartjs-2'

defaults.global.defaultFontStyle = 'Bold'

function TopCategories(props) {

  const [topData, setTopData] = useState({
    labels: [
    ],
    datasets: [{
        data: [],
        backgroundColor: []
    }]
});
  const colors = ['#FF6384', '#36A2EB','#FFCE56', '#16c79a', '#8675a9'];
  useEffect(() => {
    const modifyData = async (dataCurrency) => {

        const history = localStorage.getItem('history');
        const parsedHistory = JSON.parse(history);
        let top = {};

        const getData = (type, top, parsedHistory) => {
            let aux = Object.keys(parsedHistory[type]);
            for (let i = 0; i < aux.length; ++i){
                let categories = parsedHistory[type][aux[i]]["categories"];
                let items = parsedHistory[type][aux[i]]["items"];
                for (let j = 0; j < categories.length; ++j){
                    if (top[categories[j]] === undefined){
                        top[categories[j]] = 0;
                    }
                    let cost = 0;
                    for (let k = 0; k < items[j].length; ++k){
                        if (items[j][k][2] === props.currency){
                            cost += Number(items[j][k][1]);
                        }
                        else{
                            cost += Number(items[j][k][1]) / Number(dataCurrency[items[j][k][2]]);
                        }
                    }
                    top[categories[j]] += cost;
                }
            }
        }
        if (parsedHistory === null){
            return;
        }
        getData("income", top, parsedHistory);
        getData("expense", top, parsedHistory);
        let keysOfTop = Object.keys(top);
        let sortedTop  = [];
        for (let i = 0; i < keysOfTop.length; ++i){
            sortedTop.push({val: top[keysOfTop[i]], index: i});
        }
        sortedTop.sort((a, b) => b.val - a.val);
        let topDataAux = {...topData};
        topDataAux.datasets[0].data = [];
        topDataAux.labels = [];
        topDataAux.datasets[0].backgroundColor = [];
        for (let i = 1; i <= Math.min(keysOfTop.length, props.numberOfCategories); ++i){
            topDataAux.labels.push(keysOfTop[sortedTop[i - 1].index]);
            topDataAux.datasets[0].data.push((sortedTop[i - 1].val).toFixed(2));
            topDataAux.datasets[0].backgroundColor.push(colors[i - 1]);
        }
        setTopData(topDataAux);
    }
    const changeToCurrentCurrency = async () => {
        const dataCurrency = await exchangeRatesApi(props.currency);
        if (localStorage.length !== 0){
          await modifyData(dataCurrency);
        }
      }
    changeToCurrentCurrency();
  }, []);
  return (
    <div className="TopCategories">
        <h1>Top {props.numberOfCategories} </h1>
        <Doughnut data={topData} />
    </div>
  );
}

export default TopCategories;
