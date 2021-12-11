import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles(theme => ({
  filenameHeadline: {
    flexGrow: 1,
  }
}));

const PackageHeader = (props) => {
  const classes = useStyles();
  const handleDrawerToggle = () => {
    props.onToggleDrawer()
  }

  if (!props.scmPackage) {
    return <AppBar></AppBar>
  }

  let hash = props.scmPackage.hash
  let link = React.forwardRef((props, ref) => <Link {...props} to={"/p/" + hash + "/download"} ref={ref} />);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          size="large">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.filenameHeadline}>
          {props.scmPackage.filename}
        </Typography>
        <Button variant="contained" color="secondary" component={link} startIcon={<CloudDownloadIcon />}>Download</Button>
      </Toolbar>
    </AppBar>
  );
}

export default PackageHeader