import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Item from './Item';
import exchangeRatesApi from './exchangeRatesApi';

function Dashboard(props) {
  const types = ["income", "expense", "deposit"];
  const [type, setType] = useState(0);
  const [currency, setCurrency] = useState("EUR");
  const [addItems, setAddItems] = useState([]);
  const [totalCost, setTotalCost] = useState({
    EUR: 0,
    RON: 0
  });
  const [rates, setRates] = useState({});
  const [totalCostCurrency, setTotalCostCurrency] = useState("EUR");

  useEffect(async () => {
    const data = await exchangeRatesApi("EUR");
    setRates(data);
  }, []);

  useEffect(async () => {
    const data = await exchangeRatesApi(totalCostCurrency);
    setRates(data);
  }, [totalCostCurrency])


  const incomeSVG = (
          <svg width="70" height="22" viewBox="0 0 70 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12.4764C28.7826 40.5567 42.6522 -21.5155 68 12.4764" stroke="#4840B5" strokeWidth="4"/>
          </svg>
  )
  const incomeStyle = {
    background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 0.01%, rgba(72, 64, 181, 0.35) 100%)"
  }


  const expenseSVG = (
    <svg width="70" height="22" viewBox="0 0 70 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12.4764C28.7826 40.5567 42.6522 -21.5155 68 12.4764" stroke="#FF9A62" strokeWidth="4"/>
    </svg>
  )
  const expenseStyle = {
    background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 0.01%, rgba(244, 110, 35, 0.35) 100%)"
  }


  const depositSVG = (
    <svg width="70" height="22" viewBox="0 0 70 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12.4764C28.7826 40.5567 42.6522 -21.5155 68 12.4764" stroke="#FF9A62" strokeWidth="4"/>
    </svg>

  )
  const depositStyle = {
    background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 0.01%, rgba(154, 154, 154, 0.35) 100%)"
  }

  const activeItem = {
    boxShadow: "2px 2px 10px 5px rgba(0, 0, 0, 0.25)"
  }

  const items = [null, null, null];
  items[type] = activeItem;



  const changeType = (newType) => {
    setType(newType);
  }

  const changeCurrency = (event) => {
    setCurrency(event.target.value);
  }


  const addItem = () => {
    let nameOfItem = document.getElementsByClassName("nameOfItemInput")[0].value;
    let costOfItem = document.getElementsByClassName("costOfItemInput")[0].value;
    let currencyOfItem = document.getElementsByClassName("currencyOfItemInput")[0].value;
    if (isNaN(costOfItem) || costOfItem.length === 0 || nameOfItem.length === 0){
      return;
    }
    const items = [...addItems];
    items.push([nameOfItem, costOfItem, currencyOfItem]);
    const cost = {...totalCost};
    cost[currencyOfItem] += Number(costOfItem);
    setTotalCost(cost);
    setAddItems(items);
    document.getElementsByClassName("nameOfItemInput")[0].value = "";
    document.getElementsByClassName("costOfItemInput")[0].value = "";
  }
  const displayTotalCost = () => {
    console.log(rates);
    let cost = 0;
    for (let i = 0; i < addItems.length; ++i){
      if (addItems[i][2] == totalCostCurrency){
        cost += Number(addItems[i][1]);
      }
      else{
        cost += Number(addItems[i][1]) / Number(rates[addItems[i][2]]);
      }
    }
    return cost.toFixed(2);
  }
  const displayItems = () => {
    const arr = [];
    for (let i = 0; i < addItems.length; ++i){
        let color = "#C2DFFF";
        if (i % 2 === 1){
          color = "#C0C0C0";
        }
        arr.push(<Item index = {i} deleteItem = {deleteItem} color = {color} key = {i} nameOfItem = {addItems[i][0]} costOfItem = {addItems[i][1]} currencyOfItem = {addItems[i][2]}></Item>)
    }
    return arr;
  }
  const changeTotalCostCurrency = (event) => {
    let curr = event.target.value;
    setTotalCostCurrency(curr);
  }
  const addTheTransaction = () => {
    const data = {...props.localStorageData};
    for (let i = 0; i < addItems.length; ++i){
      data[types[type]][addItems[i][2]] += Number(addItems[i][1]);
    }
    setAddItems([]);
    props.setLocalStorageData(data);
  }

  const deleteItem = (index) => {
    const items = [...addItems];
    for (let i = index; i < items.length - 1; ++i){
      items[i] = items[i + 1];
    }
    items.pop();
    setAddItems(items);
  }

  return (
    <div className="dashboard">

      <div>
            <h1>Dashboard</h1>
            <div className = "moneyData">

              <div className = "item" style = {activeItem}>

                <div className = "icon" style = {incomeStyle}>
                  {incomeSVG}
                </div>

                <div>
                  <h3>Income</h3>
                  <p> {props.localStorageData === null ? 0 : props.localStorageData.income[currency].toLocaleString()} {currency}</p>
                </div>

              </div>

              <div className = "item" style = {activeItem}>
                
                <div className = "icon" style = {expenseStyle}>
                  {expenseSVG}
                </div>
                
                <div>
                  <h3>Expense</h3>
                  <p>{props.localStorageData === null ? 0 : props.localStorageData.expense[currency].toLocaleString()} {currency}</p>
                </div>

              </div>

              <div className = "item" style = {activeItem}>
                
                <div className = "icon" style = {depositStyle}>
                  {incomeSVG}
                </div>
                
                <div>
                  <h3>Deposit</h3>
                  <p>{props.localStorageData === null ? 0 : props.localStorageData.deposit[currency].toLocaleString()} {currency}</p>
                </div>

              </div>

            </div>
        </div>
    <div>
            <h1>Add a new transaction</h1>

            <div className = "moneyData">

              <div className = "item" style = {items[0]} onClick = {() => {changeType(0)}}>

                <div className = "icon" style = {incomeStyle}>
                  {incomeSVG}
                </div>

                <div>
                  <h3>Income</h3>
                </div>

              </div>

              <div className = "item" style = {items[1]} onClick = {() => {changeType(1)}}>
                
                <div className = "icon" style = {expenseStyle}>
                  {expenseSVG}
                </div>
                
                <div>
                  <h3>Expense</h3>
                </div>

              </div>

              <div className = "item" style = {items[2]} onClick = {() => {changeType(2)}}>
                
                <div className = "icon" style = {depositStyle}>
                  {incomeSVG}
                </div>
                
                <div>
                  <h3>Deposit</h3>
                </div>

              </div>

            </div>
            <div className = "addNewItems">
                <div style = {{display: "flex", justifyContent: "space-around"}}>
                  <input className = "nameOfItemInput" placeholder = "name of item"></input>
                  <input className = "costOfItemInput" placeholder = "cost of item"></input>
                  <select className = "currencyOfItemInput">
                    <option>EUR</option>
                    <option>RON</option>
                  </select>
                </div>
                <button className = "addItemButton" onClick = {addItem}><FontAwesomeIcon icon={faPlus}/> Add</button>
                  {displayItems()}
                  {addItems.length > 0 ? <hr></hr> : null}
                  {addItems.length > 0 ? <h3 style = {{display: "inline", marginRight: "10px"}}>Total cost: {displayTotalCost()} {totalCostCurrency}</h3> : null}
                  {addItems.length > 0 ? (<select onChange = {changeTotalCostCurrency}><option>EUR</option> <option>RON</option></select>) : null}
                  {addItems.length > 0 ? <button onClick = {addTheTransaction} style = {{display: "block"}}>  Add the transaction</button> : null}
            </div>
      </div>
    </div>
  );
}

export default Dashboard;