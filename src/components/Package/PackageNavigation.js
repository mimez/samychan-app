import React from "react";
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TvIcon from '@mui/icons-material/Tv';
import StarIcon from '@mui/icons-material/Star';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: props => ({
    background: theme.palette.primary.light,
    width: props.open ? "auto" : "60px",
  }),
  container: {
    overflow: "hidden"
  },
  list: {
    minWidth: "240px"
  }
}));

const PackageNavigation = (props) => {
  const classes = useStyles(props);

  if (!props.scmPackage) {
    return <div></div>
  }

  const getNavFiles = () => {
    if (typeof props.scmPackage.files === "undefined") return []
    return props.scmPackage.files.map((file) => {
      let hash = props.scmPackage.hash
      let link = React.forwardRef((props, ref) => <Link {...props} to={"/p/" + hash + "/files/" + file.scmFileId} ref={ref} />);
      return (
        <ListItem key={"list-item-file-" + file.scmFileId} button component={link}>
          <ListItemIcon><TvIcon /></ListItemIcon>
          <ListItemText primary={file.label} secondary={file.channelCount + " channels"} />
        </ListItem>
      )
    })
  }

  const getNavFavorites = () => {
    if (typeof props.scmPackage.favorites === "undefined") return []

    return props.scmPackage.favorites.map((favorite) => {
      let hash = props.scmPackage.hash
      let link = React.forwardRef((props, ref) => <Link {...props} to={"/p/" + hash + "/favorites/" + favorite.favNo} ref={ref} />);
      return (
        <ListItem key={"list-item-fav-" + favorite.favNo} button component={link}>
          <ListItemIcon><StarIcon /></ListItemIcon>
          <ListItemText primary={"Fav #" + favorite.favNo} secondary={favorite.channelCount + " channels"} />
        </ListItem>
      )
    })
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <List className={classes.list}>
          {getNavFiles()}
        </List>
        <Divider />
        <List className={classes.list}>
          {getNavFavorites()}
        </List>
      </div>
    </div>
  );
}

export default PackageNavigation