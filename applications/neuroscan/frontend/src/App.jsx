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
import '@metacell/geppetto-meta-ui/flex-layout/style/dark.scss';
import './flexLayout.css';

const GEPPETTO = {};
window.GEPPETTO = GEPPETTO;
window.Instances = [];
global.GEPPETTO_CONFIGURATION = {};

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
