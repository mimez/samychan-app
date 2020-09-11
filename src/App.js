import React from 'react'
import './custom.scss'
import 'jquery/dist/jquery.min.js'
import ScmPackage from './components/ScmPackage'
import Index from './components/Index'
import Error from './components/Error'
import {BrowserRouter as Router, Route} from "react-router-dom"
import { SnackbarProvider } from 'material-ui-snackbar-provider'

require('dotenv').config()

export default (props) => {
  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/:scmPackageHash" component={ScmPackage} />
      </Router>
    </SnackbarProvider>
  );
}