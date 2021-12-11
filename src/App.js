import React from 'react'
import './custom.scss'
import 'jquery/dist/jquery.min.js'
import Package from './components/Package'
import Home from './components/Home'
import Stats from './components/Stats'
import {BrowserRouter as Router, Route} from "react-router-dom"
import { SnackbarProvider } from 'material-ui-snackbar-provider'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import Theme from "./Theme";
import CssBaseline from "@mui/material/CssBaseline";

require('dotenv').config()

const App = (props) => {
  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Router>
            <Route path="/stats" exact component={Stats} />
            <Route path="/" exact component={Home} />
            <Route path="/p/:scmPackageHash" component={Package} />
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </SnackbarProvider>
  );
}

export default App