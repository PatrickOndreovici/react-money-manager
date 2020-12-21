import './App.css';
import Dashboard from './Dashboard';
import Graph from './Graph';
import Nav from './Nav';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/graph" component={Graph} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
