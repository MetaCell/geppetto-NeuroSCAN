import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import NeuroScan from './pages/NeuroScan';
import PromoterDB from './pages/PromoterDB';
import About from './pages/About';

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">NeuroSCAN</Link>
        </li>
        <li>
          <Link to="/promoter">PromoterDB</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route exact path="/">
          <NeuroScan />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/promoter">
          <PromoterDB />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
