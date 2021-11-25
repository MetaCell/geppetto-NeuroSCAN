import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loader from '@metacell/geppetto-meta-ui/loader/Loader';
import NeuroScan from './pages/NeuroScan';
import PromoterDB from './pages/PromoterDB';
import About from './pages/About';
import theme from './theme';
import { addDevStages } from './redux/actions/devStages';
import { loadPromoters } from './redux/actions/promoters';
import '@metacell/geppetto-meta-ui/flex-layout/style/dark.scss';
import './flexLayout.css';

const Manager = require('@metacell/geppetto-meta-client/common/Manager').default;

const GEPPETTO = {};
window.GEPPETTO = GEPPETTO;
GEPPETTO.Resources = require('@metacell/geppetto-meta-core/Resources').default;

GEPPETTO.Manager = new Manager();
window.Instances = [];

const App = () => {
  const dispatch = useDispatch();
  const misc = useSelector((state) => state.misc);

  useEffect(() => {
    dispatch(addDevStages());
    dispatch(loadPromoters());
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Loader style={{ color: 'white' }} active={Object.keys(misc?.loading || {}).length > 0} />
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
