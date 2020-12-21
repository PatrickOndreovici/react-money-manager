import React, {useEffect, useState} from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Graph from './Graph';
import Nav from './Nav';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const [localStorageData, setLocalStorageData] = useState(null);


  useEffect(() => {
    if (localStorage.length === 0){
      const data = {
        income: {
          eur: 0,
          lei: 0
        },
        expense: {
          eur: 0,
          lei: 0
        },
        deposit: {
          eur: 0,
          lei: 0
        }
      }
      setLocalStorageData(data);
      localStorage.setItem('data', JSON.stringify(data));
    }
    else{
      const data = localStorage.getItem('data');
      setLocalStorageData(JSON.parse(data));
    }
  }, []);

  const addMoney = (type, currency, money) => {
    if (isNaN(money)){
      return;
    }
    const data = {...localStorageData};
    data[type][currency] += Number(money);
    setLocalStorageData(data);
    localStorage.setItem('data', JSON.stringify(data));
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact render={props => (
              <Dashboard {...props} localStorageData = {localStorageData} addMoney = {addMoney} />
            )} />
          <Route path="/graph" component={Graph} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
