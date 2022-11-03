/* eslint-disable */
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import Theme from '../../Theme';

const Home = function Home() {

  const [file, setFile] = useState();

  const handleSubmit = () => {
    const data = new FormData() 
    data.append('file', file)
  };

  const handleInputChange = (e) => {
    console.log(file) 
    setFile(e.target.files[0]);
    console.log(file);
  };

  

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <h1>Samychan</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleInputChange} />
          <button type="submit">Upload</button>
        </form>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Home;
