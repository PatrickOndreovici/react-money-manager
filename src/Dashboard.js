import React, {useEffect, useState} from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {

  useEffect (async () => {
    const income = await localStorage.getItem('income');
    const expense = localStorage.getItem('expense');
    const deposit = localStorage.getItem('deposit');
    const newObject = [0, 0];

    if (income === null){
      await localStorage.setItem('income', await JSON.stringify(newObject));
    }
    if (expense === null){
      localStorage.setItem('expense', await JSON.stringify(newObject));
    }
    if (deposit === null){
      localStorage.setItem('deposit', await JSON.stringify(newObject));
    }
    await setIncome([2, 2])

  }, []);
  const [method, setMethod] = useState();
  const [income, setIncome] = useState();
  const [expense, setExpense] = useState();
  const [deposit, setDeposit] = useState();
  const [currency, setCurrency] = useState(0);
   
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
  items[method] = activeItem;


  const changeMethod = (newMethod) => {
    setMethod(newMethod);
  }

  const transaction = () => {
    let money = document.getElementsByClassName("moneyInput")[0].value;
    if (isNaN(money)){
      console.log("not a number");
      return;
    }
    money = Number(money);

    switch (method) {
      case 0:
        let income = JSON.parse(localStorage.getItem('income'));
        console.log(income)
        income[currency] += money;
        localStorage.setItem('income', JSON.stringify(income));
        setIncome(income);
        break;
    
      default:
        break;
    }
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
            <p> $</p>
          </div>

        </div>

        <div className = "item" style = {activeItem}>
          
          <div className = "icon" style = {expenseStyle}>
            {expenseSVG}
          </div>
          
          <div>
            <h3>Expense</h3>
            <p>30$</p>
          </div>

        </div>

        <div className = "item" style = {activeItem}>
          
          <div className = "icon" style = {depositStyle}>
            {incomeSVG}
          </div>
          
          <div>
            <h3>Deposit</h3>
            <p>30$</p>
          </div>

        </div>

      </div>
     </div>
    <div>
      <h1>Add a new transaction</h1>

      <div className = "moneyData">

        <div className = "item" style = {items[0]} onClick = {() => {changeMethod(0)}}>

          <div className = "icon" style = {incomeStyle}>
            {incomeSVG}
          </div>

          <div>
            <h3>Income</h3>
          </div>

        </div>

        <div className = "item" style = {items[1]} onClick = {() => {changeMethod(1)}}>
          
          <div className = "icon" style = {expenseStyle}>
            {expenseSVG}
          </div>
          
          <div>
            <h3>Expense</h3>
          </div>

        </div>

        <div className = "item" style = {items[2]} onClick = {() => {changeMethod(2)}}>
          
          <div className = "icon" style = {depositStyle}>
            {incomeSVG}
          </div>
          
          <div>
            <h3>Deposit</h3>
          </div>

        </div>

      </div>

      <div>
        <select>
          <option>EUR</option>
          <option>LEI</option>
        </select>
        <input className = "moneyInput"></input>
        <button onClick = {transaction}>Add the transaction</button>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
