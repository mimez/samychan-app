import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  filenameHeadline: {
    flexGrow: 1,
  },
}));

const PackageHeader = function ({ onToggleDrawer, scmPackage }) {
  const classes = useStyles();
  const handleDrawerToggle = () => {
    onToggleDrawer();
  };

  if (!scmPackage) {
    return <AppBar />;
  }

  const { hash } = scmPackage;

  // eslint-disable-next-line
  const link = React.forwardRef((props, ref) => <Link {...props} to={`/p/${hash}/download`} ref={ref} />);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.filenameHeadline}>
          {scmPackage.filename}
        </Typography>
        <Button variant="contained" color="secondary" component={link} startIcon={<CloudDownloadIcon />}>Download</Button>
      </Toolbar>
    </AppBar>
  );
};

PackageHeader.propTypes = {
  scmPackage: PropTypes.shape({
    hash: PropTypes.string,
    scmPackageId: PropTypes.number,
    filename: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.shape({
      scmFileId: PropTypes.number,
      label: PropTypes.string,
      icon: PropTypes.string,
      channelCount: PropTypes.number,
    })),
    favorites: PropTypes.arrayOf(PropTypes.shape({
      favNo: PropTypes.number,
      channelCount: PropTypes.number,
    })),
  }).isRequired,
  onToggleDrawer: PropTypes.func,
};
PackageHeader.defaultProps = {
  onToggleDrawer: () => {},
};

export default PackageHeader;
