import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import NeuroScan from './pages/NeuroScan';
import PromoterDB from './pages/PromoterDB';
import About from './pages/About';
import theme from './theme';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
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
    </Router>
  </MuiThemeProvider>
);

export default App;
