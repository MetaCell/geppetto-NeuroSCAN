import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch } from 'react-redux';
import NeuroScan from './pages/NeuroScan';
import PromoterDB from './pages/PromoterDB';
import About from './pages/About';
import theme from './theme';
import { addDevStages } from './redux/actions/devStages';
import '@metacell/geppetto-meta-ui/flex-layout/style/light.scss';

const Manager = require('@metacell/geppetto-meta-client/common/Manager').default;

const GEPPETTO = {};
window.GEPPETTO = GEPPETTO;
GEPPETTO.Resources = require('@metacell/geppetto-meta-core/Resources').default;

GEPPETTO.Manager = new Manager();
window.Instances = [];

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addDevStages());
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={NeuroScan} />
          <Route path="/about">
            <About />
          </Route>
          <Route path="/promoter" component={PromoterDB} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
