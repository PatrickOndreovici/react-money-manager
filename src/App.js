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
          EUR: 0,
          RON: 0
        },
        expense: {
          EUR: 0,
          RON: 0
        },
        deposit: {
          EUR: 0,
          RON: 0
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
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(localStorageData));
  }, [localStorageData]);
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact render={props => (
              <Dashboard {...props} localStorageData = {localStorageData} setLocalStorageData = {setLocalStorageData}/>
            )} />
          <Route path="/graph" component={Graph} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
