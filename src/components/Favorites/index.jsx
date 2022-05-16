import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'material-ui-snackbar-provider';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import makeStyles from '@mui/styles/makeStyles';
import Api from '../../utils/Api';
import ChannelList from '../ChannelList';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: '1rem',
  },
}));

const Favorites = function Favorites({ onChange }) {
  const { scmPackageHash, favNo } = useParams();
  const snackbar = useSnackbar();
  const [isInitialized, setIsInitialized] = useState(false);
  const [channels, setChannels] = useState([]);
  const [modifiedChannels, setModifiedChannels] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const classes = useStyles();

  const initData = () => {
    Api.getFavorites(scmPackageHash, favNo, (data) => {
      setChannels(data.selectedChannels);
      setIsInitialized(true);
    });
  };

  useEffect(() => {
    initData();
    // eslint-disable-next-line
  }, [scmPackageHash, favNo])

  const save = () => {
    const newChannels = [...channels];
    newChannels.sort((a, b) => (parseInt(a.channelNo, 10) > parseInt(b.channelNo, 10) ? 1 : -1));
    const data = [];
    newChannels.forEach((item) => data.push({ channelId: item.channelId, sort: item.channelNo }));
    setIsSaving(true);
    Api.saveFavorites(scmPackageHash, favNo, data, () => {
      setModifiedChannels({});
      setIsSaving(false);
      onChange();
    });
  };

  const removeChannelsFromFav = (channelIds, currentFavNo, clearAfterSaving) => {
    Api.removeChannelsFromFav(scmPackageHash, currentFavNo, channelIds, () => {
      clearAfterSaving();
      snackbar.showMessage(
        `${channelIds.length} channel(s) successfully removed from Fav #${currentFavNo}`,
      );
      onChange();
      initData();
    });
  };

  const handleChannelChange = (changedChannel) => {
    const newChannels = [...channels];
    /* eslint-disable */
    for (const i in newChannels) {
      if (newChannels[i].channelId === changedChannel.channelId) {
        newChannels[i] = {
          channelId: parseInt(changedChannel.channelId),
          channelNo: parseInt(changedChannel.channelNo),
          name: changedChannel.name,
        };
      }
    }
    /* eslint-disable */
    setChannels(newChannels);
    setModifiedChannels({ ...modifiedChannels, [changedChannel.channelId]: changedChannel });
  };

  let modifiedChannelsAction;

  if (Object.keys(modifiedChannels).length > 0) {
    modifiedChannelsAction = (
      <Button
        variant="contained"
        color="secondary"
        onClick={save}
        className={classes.button}
      >
        <SaveIcon />
        Save
        {' '}
        {Object.keys(modifiedChannels).length}
        {' '}
        item
        {isSaving && <CircularProgress size={24} />}
      </Button>
    );
  }

  const channelActions = [
    { label: 'Remove from Fav', onClick: (channelsToRemove, clearAfterSaving) => { removeChannelsFromFav(channelsToRemove, favNo, clearAfterSaving); } },
  ];

  return (
    isInitialized
      ? (
        <ChannelList
          channels={channels}
          channelActions={channelActions}
          channelNameReadOnly
          onChannelChange={handleChannelChange}
          optionButtons={modifiedChannelsAction}
          headline={`Favorites #${favNo}`}
        />
      ) : (
        <Snackbar open>
          <Alert elevation={6} variant="filled" severity="info">
            Loading ...
          </Alert>
        </Snackbar>
      )
  );
};

Favorites.propTypes = {
  onChange: PropTypes.func,
};
Favorites.defaultProps = {
  onChange: () => {},
};

export default Favorites;
