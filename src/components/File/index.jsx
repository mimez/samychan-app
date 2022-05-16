import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import makeStyles from '@mui/styles/makeStyles';
import { useSnackbar } from 'material-ui-snackbar-provider';
import PropTypes from 'prop-types';
import apiUrlGenerator from '../../utils/apiUrlGenerator';
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

const File = function File({ scmPackage, onChange }) {
  const { scmPackageHash, scmFileId } = useParams();
  const classes = useStyles();
  const snackbar = useSnackbar();

  const [isInitialized, setIsInitialized] = useState(false);
  const [channels, setChannels] = useState([]);
  const [filename, setFilename] = useState(undefined);
  const [modifiedChannels, setModifiedChannels] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    Api.getFile(scmPackageHash, scmFileId, (data) => {
      setChannels(data.channels);
      setFilename(data.label);
      setIsInitialized(true);
    });
  }, [scmPackageHash, scmFileId]);

  const handleChannelChange = (channel) => {
    const newChannels = [...channels];
    /* eslint-disable */
    for (const i in newChannels) {
      if (newChannels[i].channelId === channel.channelId) {
        newChannels[i] = channel;
      }
    }
    /* eslint-enable */
    setChannels(newChannels);
    setModifiedChannels({ ...modifiedChannels, [channel.channelId]: channel });
  };

  const addChannelsToFav = (channelIds, favNo, clearAfterSaving) => {
    Api.addChannelsToFav(scmPackageHash, favNo, channelIds, () => {
      setModifiedChannels({});
      clearAfterSaving();
      snackbar.showMessage(
        `${channelIds.length} channel(s) successfully added to Fav #${favNo}`,
      );
      onChange();
    });
  };

  const save = () => {
    setIsSaving(true);
    Api.saveFile(scmPackageHash, scmFileId, modifiedChannels, () => {
      setModifiedChannels({});
      setIsSaving(false);
      onChange();
      snackbar.showMessage(
        'File successfully saved',
      );
    });
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
        item(s)
        {isSaving && <CircularProgress size={24} />}
      </Button>
    );
  }

  const channelActions = [];
  // eslint-disable-next-line
  scmPackage.favorites.forEach((element) => {
    channelActions.push({ label: `Add to Fav #${element.favNo}`, onClick: (channelsToAdd, clearAfterSaving) => { addChannelsToFav(channelsToAdd, element.favNo, clearAfterSaving); } });
  });

  return (
    isInitialized
      ? (
        <ChannelList
          channels={channels}
          onChannelChange={handleChannelChange}
          channelActions={channelActions}
          optionButtons={modifiedChannelsAction}
          headline={filename}
          exportUrl={apiUrlGenerator.buildFileExportUrl(scmPackageHash, scmFileId)}
          channelNameReadOnly={false}
        />
      )
      : (
        <Snackbar open>
          <Alert elevation={6} variant="filled" severity="info">
            Loading ...
          </Alert>
        </Snackbar>
      )
  );
};

File.propTypes = {
  onChange: PropTypes.func,
  scmPackage: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    favorites: PropTypes.arrayOf(
      PropTypes.shape({
        favNo: PropTypes.number,
        channelCount: PropTypes.number,
      }),
    ),
  }).isRequired,
};
File.defaultProps = {
  onChange: () => {},
};

export default File;
