import React, {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import File from '../File';
import Favorites from '../Favorites';
import PackageNavigation from "./PackageNavigation";
import Downloader from "../Downloader";
import CircularProgress from '@mui/material/CircularProgress';
import Api from "../../utils/Api"
import PackageHeader from "./PackageHeader"
import makeStyles from '@mui/styles/makeStyles';
import { Helmet } from 'react-helmet'
import Error from "../Error.jsx"

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

const Package = (props) => {
  const classes = useStyles(props);
  const [scmPackage, setScmPackage] = useState(undefined)
  const [scmPackageNavigation, setScmPackageNavigation] = useState(undefined)
  const [navOpen, setNavOpen] = useState(true)
  const [isError, setError] = useState(null)

  const handleDrawerToggle = () => {
    setNavOpen(!navOpen)
  }

  useEffect(() => {
    loadData()
    //eslint-disable-next-line
  }, [props.match.params.scmPackageHash])

  const loadData = () => {
    setError(null)
    Api.getPackage(props.match.params.scmPackageHash, (data) => {
      setScmPackage(data)
      setScmPackageNavigation(data)
    }, (error) => setError(error))
  }

  const updateNavigation = () => {
    Api.getPackage(props.match.params.scmPackageHash, (data) => setScmPackageNavigation(data))
  }

  var render = () => {
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{scmPackage.filename} | SamyCHAN</title>
        </Helmet>
        <PackageHeader scmPackage={scmPackageNavigation} onToggleDrawer={handleDrawerToggle}/>
        <div className={classes.mainContainer}>
          <PackageNavigation open={navOpen} scmPackage={scmPackageNavigation}/>
          <main className={classes.main}>
            <Route path="/p/:scmPackageHash/files/:scmFileId" component={(props) => <File {...props} scmPackage={scmPackage} onChange={() => {updateNavigation()}} />} />
            <Route path="/p/:scmPackageHash/favorites/:favNo" component={(props) => <Favorites {...props} onChange={() => {updateNavigation()}} />} />
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

  if (isError) {
    return <Error onReset={loadData} />
  } else if (typeof scmPackage != "undefined") {
    return render()
  } else {
    return showLoadingScreen()
  }
}

export default Package