import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from "../../Theme";
import {ThemeProvider} from "@material-ui/core/styles";

export default (props) => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <h1>Samychan</h1>
    </ThemeProvider>
  )
}