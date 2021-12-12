import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import Theme from '../../Theme';

const Home = function () {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <h1>Samychan</h1>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Home;
