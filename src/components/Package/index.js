import React, {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import File from '../File';
import Favorites from '../Favorites';
import PackageNavigation from "./PackageNavigation";
import Downloader from "../Downloader";
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Theme from "../../Theme"
import Api from "../../utils/Api"
import PackageHeader from "./PackageHeader"
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  mainContainer: {
    display: "flex",
    flexGrow: 1,
    overflow: "hidden"
  },
  main: {
    flexGrow: 1
  }
}));

export default (props) => {
  const classes = useStyles(props);
  const [scmPackage, setScmPackage] = useState(undefined)
  const [navOpen, setNavOpen] = useState(true)

  const handleDrawerToggle = () => {
    setNavOpen(!navOpen)
  }

  useEffect(() => {
    Api.getPackage(props.match.params.scmPackageHash, (data) => setScmPackage(data))
  }, [props.match.params.scmPackageHash])

  var renderApp = () => {
    return (
      <div className={classes.root}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <PackageHeader scmPackage={scmPackage} onToggleDrawer={handleDrawerToggle}/>
          <div className={classes.mainContainer}>
            <PackageNavigation open={navOpen} scmPackage={scmPackage}/>
            <main className={classes.main}>
              <Route path="/:scmPackageHash/files/:scmFileId" component={File} />
              <Route path="/:scmPackageHash/favorites/:favNo" component={Favorites} />
              <Route path="/:scmPackageHash/download" component={Downloader} />
            </main>
          </div>
        </ThemeProvider>
      </div>
    )
  }

  var showLoadingScreen = () => {
    return (
      <CircularProgress />
    )
  }

  return (
    scmPackage ? renderApp() : showLoadingScreen()
  )
}

