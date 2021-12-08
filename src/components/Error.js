import React from "react"
import Grid from '@material-ui/core/Grid';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const Error = (props) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
        <div style={{textAligin: "center"}}>
          <ErrorOutlineIcon />
          <h1>Error</h1>
          <p>Something went wrong</p>
          <a onClick={props.onReset}>Reset</a>
        </div>
      </Grid>   

    </Grid> 
        
  )
}

export default Error