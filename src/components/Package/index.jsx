import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import makeStyles from '@mui/styles/makeStyles';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import File from '../File';
import Favorites from '../Favorites';
import PackageNavigation from './PackageNavigation';
import Downloader from '../Downloader';
import Api from '../../utils/Api';
import PackageHeader from './PackageHeader';
import Error from '../Error';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  mainContainer: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
  },
  main: {
    flexGrow: 1,
  },
}));

const Package = function ({ scmPackageHash }) {
  const classes = useStyles();
  const [scmPackage, setScmPackage] = useState(undefined);
  const [scmPackageNavigation, setScmPackageNavigation] = useState(undefined);
  const [navOpen, setNavOpen] = useState(true);
  const [isError, setError] = useState(null);

  const handleDrawerToggle = () => {
    setNavOpen(!navOpen);
  };

  const loadData = () => {
    setError(null);
    Api.getPackage(scmPackageHash, (data) => {
      setScmPackage(data);
      setScmPackageNavigation(data);
    }, (error) => setError(error));
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [props.match.params.scmPackageHash])

  const updateNavigation = () => {
    Api.getPackage(scmPackageHash, (data) => setScmPackageNavigation(data));
  };

  /* eslint-disable */
  const render = () => (
    <div className={classes.root}>
      <Helmet>
        <title>
          {scmPackage.filename}
          {' '}
          | SamyCHAN
        </title>
      </Helmet>
      <PackageHeader scmPackage={scmPackageNavigation} onToggleDrawer={handleDrawerToggle} />
      <div className={classes.mainContainer}>
        <PackageNavigation open={navOpen} scmPackage={scmPackageNavigation} />
        <main className={classes.main}>
          <Route path="/p/:scmPackageHash/files/:scmFileId" component={(props) => <File {...props} scmPackage={scmPackage} onChange={() => { updateNavigation(); }} />} />
          <Route path="/p/:scmPackageHash/favorites/:favNo" component={(props) => <Favorites {...props} onChange={() => { updateNavigation(); }} />} />
          <Route path="/p/:scmPackageHash/download" component={Downloader} />
        </main>
      </div>
    </div>
  );
  /* eslint-enable */

  const showLoadingScreen = () => (
    <CircularProgress />
  );

  if (isError) {
    return <Error onReset={loadData} />;
  } if (typeof scmPackage !== 'undefined') {
    return render();
  }
  return showLoadingScreen();
};

Package.propTypes = {
  scmPackageHash: PropTypes.element.isRequired,
};

export default Package;
