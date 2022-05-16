import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TvIcon from '@mui/icons-material/Tv';
import StarIcon from '@mui/icons-material/Star';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: (open) => ({
    /* background: theme.palette.primary.light, */
    width: open ? 'auto' : '60px',
  }),
  container: {
    overflow: 'hidden',
  },
  list: {
    minWidth: '240px',
  },
}));

const PackageNavigation = function PackageNavigation({ scmPackage, open }) {
  const classes = useStyles(open);
  const path = useLocation().pathname;

  if (!scmPackage) {
    return <div />;
  }

  const getNavFiles = () => {
    if (typeof scmPackage.files === 'undefined') return [];
    return scmPackage.files.map((file) => {
      const { hash } = scmPackage;
      const linkTo = `/p/${hash}/files/${file.scmFileId}`;
      // eslint-disable-next-line
      const link = React.forwardRef((props, ref) => <Link {...props} to={linkTo} ref={ref} />);
      return (
        <ListItem key={`list-item-file-${file.scmFileId}`} button component={link} selected={linkTo === path}>
          <ListItemIcon><TvIcon /></ListItemIcon>
          <ListItemText primary={file.label} secondary={`${file.channelCount} channels`} />
        </ListItem>
      );
    });
  };

  const getNavFavorites = () => {
    if (typeof scmPackage.favorites === 'undefined') return [];

    return scmPackage.favorites.map((favorite) => {
      const { hash } = scmPackage;
      const linkTo = `/p/${hash}/favorites/${favorite.favNo}`;
      // eslint-disable-next-line
      const link = React.forwardRef((props, ref) => <Link {...props} to={linkTo} ref={ref} />);
      return (
        <ListItem key={`list-item-fav-${favorite.favNo}`} button component={link} selected={linkTo === path}>
          <ListItemIcon><StarIcon /></ListItemIcon>
          <ListItemText primary={`Fav #${favorite.favNo}`} secondary={`${favorite.channelCount} channels`} />
        </ListItem>
      );
    });
  };

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
};

PackageNavigation.propTypes = {
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
  open: PropTypes.bool,
};
PackageNavigation.defaultProps = {
  open: true,
};
export default PackageNavigation;
