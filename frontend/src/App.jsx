import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import NeuroScan from './pages/NeuroScan';
import PromoterDB from './pages/PromoterDB';
import About from './pages/About';
import theme from './theme';

const App = () => (
  <MuiThemeProvider theme={theme}>
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
  </MuiThemeProvider>
);

export default App;
