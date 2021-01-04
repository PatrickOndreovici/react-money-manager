import React, {useState} from 'react';
import './History.css'
function History() {

  const [currentDate, setCurrentDate] = useState(null);

  const displayIncome = (date) => {
    if (date === null){
      return <h1>nu avem data</h1>
    }
    let history = localStorage.getItem('history');
    if (history === null){
      return null;
    }
    let parsedHistory = JSON.parse(history);
  }

  const displayExpense = (date) => {

  }

  const displayDeposit = (date) => {
    
  }
  return (
    <div className="History">
        <input type="date" onChange = {(event) => setCurrentDate(event.target.value)}></input>
        <h3 style = {{marginLeft: "2rem"}}>income</h3>
        {displayIncome(currentDate)}
        <h3 style = {{marginLeft: "2rem"}}>expense</h3>
        <h3 style = {{marginLeft: "2rem"}}>deposit</h3>
    </div>
  );
}

export default History;
