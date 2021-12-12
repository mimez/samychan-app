import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: '50px',
  },
}));

const Error = function ({ onReset }) {
  const classes = useStyles();

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
        <div style={{ textAlign: 'center' }}>
          <ErrorOutlineIcon className={classes.icon} />
          <h1>Error</h1>
          <p>Something went wrong</p>
          <Button onClick={onReset} href="#" underline="hover">Retry</Button>
        </div>
      </Grid>
    </Grid>
  );
};

Error.propTypes = {
  onReset: PropTypes.element.isRequired,
};

export default Error;
