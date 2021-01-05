import './LineGraph.css';
import {Line} from 'react-chartjs-2';
import React, {useState, useEffect} from 'react';
import exchangeRatesApi from '../exchangeRatesApi';

function LineGraph(props) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [avarageProfit, setAvarageProfit] = useState(0);
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
            label: 'line graph',
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
            data: new Array(20).fill(0)
            }
        ]
        }); 


    useEffect(() => {
        const modifyData = async (dataCurrency) => {
            const history = localStorage.getItem('history');
            const parsedHistory = JSON.parse(history);
            if (parsedHistory === null){
                return;
            }

            const dataAux = {...data};
            dataAux.labels = [];
            dataAux.datasets[0].data = [];
            const getMoney = (items) => {
                let totalCost = 0;
                for (let i = 0; i < items.length; ++i){
                    for (let j = 0; j < items[i].length; ++j){
                        if (items[i][j][2] === props.currency){
                            totalCost += Number(items[i][j][1]);
                        }
                        else{
                            totalCost += Number(items[i][j][1]) / Number(dataCurrency[items[i][j][2]]);
                        }
                    }
                }
                return totalCost;
            }
            let avarage = 0;
            if (props.numberOfMonths === 1){

            }
            else{
                let month = new Date().getMonth();
                let year = new Date().getFullYear();
                for (let i = 1; i <= props.numberOfMonths; ++i){
                    let cost = 0;
                    for (let day = 1; day <= 31; ++day){
                        let date = "";
                        if (day <= 9){
                            date += '0';
                        }
                        date += day;
                        date += '.';
                        if (month + 1 <= 9){
                            date += '0';
                        }
                        date += (month + 1);
                        date += '.';
                        date += year;
                        if (parsedHistory["income"][date] !== undefined){
                            cost += getMoney(parsedHistory["income"][date].items);
                        }
                        if (parsedHistory["expense"][date] !== undefined){
                            cost -= getMoney(parsedHistory["expense"][date].items);
                        }
                    }
                    avarage += cost;
                    cost = cost.toFixed(2);
                    dataAux.datasets[0].data.push(cost);
                    dataAux.labels.push(months[month] + " " + year);
                    --month;
                    if (month == -1){
                        month += 12;
                        --year;
                    }
                }
                avarage /= props.numberOfMonths;
                avarage = avarage.toFixed(2);
            }
            dataAux.datasets[0].data.reverse();
            dataAux.labels.reverse();
            setData(dataAux);
            setAvarageProfit(avarage);
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
            <h3 style = {{textAlign: "center"}}>Avarage Profit: {avarageProfit} {props.currency}</h3>
            <div style={{ position: "relative", margin: "auto", width: "70vw", height: "500px"}}>
                <Line data={data} options={{
                    maintainAspectRatio : false
                }}/>
            </div>
        </div>
    );
}

export default LineGraph;
