import React, {useEffect, useState} from "react"
import ChannelList from "./../ChannelList";
import Api from "../../utils/Api";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import {useSnackbar} from 'material-ui-snackbar-provider'
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: "1rem",
  }
}));

export default (props) => {

  const snackbar = useSnackbar()
  const [channels, setChannels] = useState([])
  const [modifiedChannels, setModifiedChannels] = useState({})
  const channelListOptions = [
    <Tooltip title="Add channel">
      <Fab color="secondary" size="medium" aria-label="add">
        <AddIcon />
      </Fab>
    </Tooltip>
  ]
  const [isSaving, setIsSaving] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    initData()
  }, [props.match.params.scmPackageHash, props.match.params.favNo])

  const initData = () => {
    Api.getFavorites(props.match.params.scmPackageHash, props.match.params.favNo, (data) => {
      setChannels(data.selectedChannels)
    })
  }

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
    {label: "Remove from Fav", onClick: (channels, clearAfterSaving) => {removeChannelsFromFav(channels, 1, clearAfterSaving)}},
  ]

  return (
    <ChannelList
      channels={channels}
      channelActions={channelActions}
      channelNameReadOnly={true}
      onChannelChange={handleChannelChange}
      optionButtons={modifiedChannelsAction}
    />
  );
}
