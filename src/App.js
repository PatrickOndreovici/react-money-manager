import React, {useEffect, useState} from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Graph from './components/Graph';
import History from './components/History';
import Nav from './components/Nav';
import {Switch, Route, useLocation} from 'react-router-dom';

function App() {
  const [localStorageData, setLocalStorageData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
  let location = useLocation();
  useEffect(() => {
    const route = window.location.pathname;
    if (route === "/") setActiveIndex(0);
    else if (route === '/graph') setActiveIndex(1);
    else if (route === '/history') setActiveIndex(2);
  }, [location]);
  return (
      <div className="App">
        <Nav activeIndex = {activeIndex}/>
        <Switch>
          <Route path="/" exact render={props => (
              <Dashboard {...props} localStorageData = {localStorageData} setLocalStorageData = {setLocalStorageData}/>
            )} />
          <Route path="/graph" component={Graph} />
          <Route path="/history" component={History} />
        </Switch>
      </div>
  );
}

export default App;
