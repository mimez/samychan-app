import React from "react"
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "50px"
  }
}));

const Error = (props) => {
  const classes = useStyles()

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
        <div style={{textAlign: "center"}}>
          <ErrorOutlineIcon className={classes.icon} />
          <h1>Error</h1>
          <p>Something went wrong</p>
          <Link onClick={props.onReset} href="#">Retry</Link>
        </div>
      </Grid>   

    </Grid> 
        
  )
}

export default Error