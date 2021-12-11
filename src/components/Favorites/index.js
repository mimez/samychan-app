import React, {useEffect, useState} from "react"
import ChannelList from "./../ChannelList";
import Api from "../../utils/Api";
import {useSnackbar} from 'material-ui-snackbar-provider'
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar"
import Alert from '@mui/material/Alert';
import CircularProgress from "@mui/material/CircularProgress";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: "1rem",
  }
}));

const Favorites = (props) => {

  const snackbar = useSnackbar()
  const [isInitialized, setIsInitialized] = useState(false)
  const [channels, setChannels] = useState([])
  const [modifiedChannels, setModifiedChannels] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const classes = useStyles()

  const initData = () => {
    Api.getFavorites(props.match.params.scmPackageHash, props.match.params.favNo, (data) => {
      setChannels(data.selectedChannels)
      setIsInitialized(true)
    })
  }

  useEffect(() => {
    initData()
    //eslint-disable-next-line
  }, [props.match.params.scmPackageHash, props.match.params.favNo])


  const save = () => {
    let newChannels = [...channels]
    newChannels.sort((a,b) => parseInt(a.channelNo) > parseInt(b.channelNo) ? 1 : -1)
    let data = []
    newChannels.forEach(item => data.push({"channelId": item.channelId, "sort": item.channelNo}))
    console.log(data)
    setIsSaving(true)
    Api.saveFavorites(props.match.params.scmPackageHash, props.match.params.favNo, data, () => {
      setModifiedChannels({})
      setIsSaving(false)
      props.onChange()
    })
  }

  const removeChannelsFromFav = (channelIds, favNo, clearAfterSaving) => {
    Api.removeChannelsFromFav(props.match.params.scmPackageHash, favNo, channelIds, () => {
      clearAfterSaving()
      snackbar.showMessage(
        `${channelIds.length} channel(s) successfully removed from Fav #${favNo}`
      )
      props.onChange()
      initData()
    })
  }

  const handleChannelChange = (channel) => {
    let newChannels = [...channels]
    for (let i in newChannels) {
      if (newChannels[i].channelId === channel.channelId) {
        newChannels[i] = channel
      }
    }
    setChannels(newChannels)
    setModifiedChannels({...modifiedChannels, [channel.channelId]: channel})
  }

  let modifiedChannelsAction;

  if (Object.keys(modifiedChannels).length > 0) {
    modifiedChannelsAction = <Button
      variant="contained"
      color="secondary"
      onClick={save}
      className={classes.button}
    >
      <SaveIcon />
      Save {Object.keys(modifiedChannels).length} item
      {isSaving && <CircularProgress size={24} />}
    </Button>
  }

  let channelActions = [
    {label: "Remove from Fav", onClick: (channels, clearAfterSaving) => {removeChannelsFromFav(channels, props.match.params.favNo, clearAfterSaving)}},
  ]

  return (
    isInitialized ?
    <ChannelList
      channels={channels}
      channelActions={channelActions}
      channelNameReadOnly={true}
      onChannelChange={handleChannelChange}
      optionButtons={modifiedChannelsAction}
      headline={"Favorites #" + props.match.params.favNo}
    /> : <Snackbar open={true}>
        <Alert elevation={6} variant="filled" severity="info">
          Loading ...
        </Alert>
      </Snackbar>
  );
}

export default Favorites