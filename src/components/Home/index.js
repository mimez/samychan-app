import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Theme from "../../Theme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

const Home = (props) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <h1>Samychan</h1>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default Home