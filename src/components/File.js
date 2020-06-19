import React, {useEffect, useState} from "react"
import ChannelList from "./ChannelList"
import Api from "../utils/Api"
import Button from "@material-ui/core/Button"
import SaveIcon from "@material-ui/icons/Save"
import CircularProgress from "@material-ui/core/CircularProgress"
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

  const classes = makeStyles()

  const [channels, setChannels] = useState([])
  const [modifiedChannels, setModifiedChannels] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    Api.getFile(props.match.params.scmPackageHash, props.match.params.scmFileId, (data) => setChannels(data.channels))
  }, [props.match.params.scmPackageHash, props.match.params.scmFileId])

  const handleChannelChange = (channel) => {
    let newChannels = [...channels]
    for (let i in newChannels) {
      if (newChannels[i].channelId === channel.channelId) {
        newChannels[i] = channel
      }
    }
    setChannels(newChannels)
    setModifiedChannels({...modifiedChannels, [channel.channelId]: channel})
    console.log(modifiedChannels)
  }

  const addChannelsToFavorite = (channels) => {
    console.log(channels)
  }

  const save = () => {
    setIsSaving(true)
    Api.saveFile(props.match.params.scmPackageHash, props.match.params.scmFileId, modifiedChannels, () => {
      setModifiedChannels({})
      setIsSaving(false)
    })
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
    {label: "Add to Fav #1", onClick: (channels) => {addChannelsToFavorite(channels, 1)}},
    {label: "Add to Fav #2", onClick: (channels) => {addChannelsToFavorite(channels, 2)}}
  ]

  return (
    <ChannelList
      channels={channels}
      onChannelChange={handleChannelChange}
      channelActions={channelActions}
      optionButtons={modifiedChannelsAction}
    />
  );
}