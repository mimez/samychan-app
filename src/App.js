import React from 'react'
import './custom.scss'
import 'jquery/dist/jquery.min.js'
import Package from './components/Package'
import Home from './components/Home'
import {BrowserRouter as Router, Route} from "react-router-dom"
import { SnackbarProvider } from 'material-ui-snackbar-provider'

require('dotenv').config()

export default (props) => {
  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/:scmPackageHash" component={Package} />
      </Router>
    </SnackbarProvider>
  );
}