import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import makeStyles from '@mui/styles/makeStyles';
import { useSnackbar } from 'material-ui-snackbar-provider';
import apiUrlGenerator from '../../utils/apiUrlGenerator';
import Api from '../../utils/Api';
import ChannelList from '../ChannelList';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: '1rem',
  },
}));

const File = function (props) {
  const classes = useStyles();
  const snackbar = useSnackbar();

  const [isInitialized, setIsInitialized] = useState(false);
  const [channels, setChannels] = useState([]);
  const [filename, setFilename] = useState(undefined);
  const [modifiedChannels, setModifiedChannels] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    Api.getFile(props.match.params.scmPackageHash, props.match.params.scmFileId, (data) => {
      setChannels(data.channels);
      setFilename(data.label);
      setIsInitialized(true);
    });
  }, [props.match.params.scmPackageHash, props.match.params.scmFileId]);

  const handleChannelChange = (channel) => {
    const newChannels = [...channels];
    for (const i in newChannels) {
      if (newChannels[i].channelId === channel.channelId) {
        newChannels[i] = channel;
      }
    }
    setChannels(newChannels);
    setModifiedChannels({ ...modifiedChannels, [channel.channelId]: channel });
  };

  const addChannelsToFav = (channelIds, favNo, clearAfterSaving) => {
    Api.addChannelsToFav(props.match.params.scmPackageHash, favNo, channelIds, () => {
      setModifiedChannels({});
      clearAfterSaving();
      snackbar.showMessage(
        `${channelIds.length} channel(s) successfully added to Fav #${favNo}`,
      );
      props.onChange();
    });
  };

  const save = () => {
    setIsSaving(true);
    Api.saveFile(props.match.params.scmPackageHash, props.match.params.scmFileId, modifiedChannels, () => {
      setModifiedChannels({});
      setIsSaving(false);
      props.onChange();
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
  props.scmPackage.favorites.forEach((element) => {
    channelActions.push({ label: `Add to Fav #${element.favNo}`, onClick: (channels, clearAfterSaving) => { addChannelsToFav(channels, element.favNo, clearAfterSaving); } });
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
          exportUrl={apiUrlGenerator.buildFileExportUrl(props.match.params.scmPackageHash, props.match.params.scmFileId)}
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

export default File;
