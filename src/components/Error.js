import React from "react"
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import makeStyles from '@mui/styles/makeStyles';

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
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
        <div style={{textAlign: "center"}}>
          <ErrorOutlineIcon className={classes.icon} />
          <h1>Error</h1>
          <p>Something went wrong</p>
          <Link onClick={props.onReset} href="#" underline="hover">Retry</Link>
        </div>
      </Grid>   

    </Grid>
  );
}

export default Error