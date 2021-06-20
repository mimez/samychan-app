import React, {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import File from '../File';
import Favorites from '../Favorites';
import PackageNavigation from "./PackageNavigation";
import Downloader from "../Downloader";
import CircularProgress from '@material-ui/core/CircularProgress';
import Api from "../../utils/Api"
import PackageHeader from "./PackageHeader"
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
    loadData()
  }, [props.match.params.scmPackageHash])

  const loadData = () => {
    Api.getPackage(props.match.params.scmPackageHash, (data) => setScmPackage(data))
  }

  var renderApp = () => {
    return (
      <div className={classes.root}>
          <PackageHeader scmPackage={scmPackage} onToggleDrawer={handleDrawerToggle}/>
          <div className={classes.mainContainer}>
            <PackageNavigation open={navOpen} scmPackage={scmPackage}/>
            <main className={classes.main}>
              <Route path="/p/:scmPackageHash/files/:scmFileId" component={(props) => <File {...props} scmPackage={scmPackage} onChange={() => {loadData()}} />} />
              <Route path="/p/:scmPackageHash/favorites/:favNo" component={(props) => <Favorites {...props} onChange={() => {loadData()}} />} />
              <Route path="/p/:scmPackageHash/download" component={Downloader} />
            </main>
          </div>
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

