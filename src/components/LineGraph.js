import './LineGraph.css';
import {Line} from 'react-chartjs-2';
import React, {useState, useEffect} from 'react';
import exchangeRatesApi from '../exchangeRatesApi';

function LineGraph(props) {
    const [data, setData] = useState({
        labels: ['other day', 'yesterday', 'today', '1', '1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1'],
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
        const modifyData = async (dataCurrency) => {

            if (props.numberOfMonths === 1){
                const history = localStorage.getItem('history');
                const parsedHistory = JSON.parse(history);
                if (parsedHistory === null){
                    return;
                }

                let incomeDates = Object.keys(parsedHistory["income"]);
                let expenseDates = Object.keys(parsedHistory["expense"]);


            }
            else{

            }
            // const history = localStorage.getItem('history');
            // const parsedHistory = JSON.parse(history);
            // let top = {};
    
            // const getData = (type, top, parsedHistory) => {
            //     let aux = Object.keys(parsedHistory[type]);
            //     for (let i = 0; i < aux.length; ++i){
            //         let categories = parsedHistory[type][aux[i]]["categories"];
            //         let items = parsedHistory[type][aux[i]]["items"];
            //         for (let j = 0; j < categories.length; ++j){
            //             if (top[categories[j]] === undefined){
            //                 top[categories[j]] = 0;
            //             }
            //             let cost = 0;
            //             for (let k = 0; k < items[j].length; ++k){
            //                 if (items[j][k][2] === props.currency){
            //                     cost += Number(items[j][k][1]);
            //                 }
            //                 else{
            //                     cost += Number(items[j][k][1]) / Number(dataCurrency[items[j][k][2]]);
            //                 }
            //             }
            //             top[categories[j]] += cost;
            //         }
            //     }
            // }
            // if (parsedHistory === null){
            //     return;
            // }
            // getData("income", top, parsedHistory);
            // getData("expense", top, parsedHistory);
            // let keysOfTop = Object.keys(top);
            // let sortedTop  = [];
            // for (let i = 0; i < keysOfTop.length; ++i){
            //     sortedTop.push({val: top[keysOfTop[i]], index: i});
            // }
            // sortedTop.sort((a, b) => b.val - a.val);
            // let topDataAux = {...topData};
            // topDataAux.datasets[0].data = [];
            // topDataAux.labels = [];
            // topDataAux.datasets[0].backgroundColor = [];
            // for (let i = 1; i <= Math.min(keysOfTop.length, props.numberOfCategories); ++i){
            //     topDataAux.labels.push(keysOfTop[sortedTop[i - 1].index]);
            //     topDataAux.datasets[0].data.push((sortedTop[i - 1].val).toFixed(2));
            //     topDataAux.datasets[0].backgroundColor.push(colors[i - 1]);
            // }
            // setTopData(topDataAux);
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
        <div className="LineGraph">
            <Line data={data} options={{
                maintainAspectRatio : false
            }}/>
        </div>
    );
}

export default LineGraph;
