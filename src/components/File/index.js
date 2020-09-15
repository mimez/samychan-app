import React, {useEffect, useState} from "react"
import ChannelList from "./../ChannelList"
import Api from "../../utils/Api"
import Button from "@material-ui/core/Button"
import SaveIcon from "@material-ui/icons/Save"
import CircularProgress from "@material-ui/core/CircularProgress"
import {makeStyles} from "@material-ui/core/styles";
import {useSnackbar} from 'material-ui-snackbar-provider'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: "1rem",
  }
}));


export default (props) => {

  const classes = useStyles()
  const snackbar = useSnackbar()

  const [isInitialized, setIsInitialized] = useState(false)
  const [channels, setChannels] = useState([])
  const [modifiedChannels, setModifiedChannels] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    Api.getFile(props.match.params.scmPackageHash, props.match.params.scmFileId, (data) => {
      setChannels(data.channels)
      setIsInitialized(true)
    })
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
  }

  const addChannelsToFav = (channelIds, favNo, clearAfterSaving) => {
    Api.addChannelsToFav(props.match.params.scmPackageHash, favNo, channelIds, () => {
      setModifiedChannels({})
      clearAfterSaving()
      snackbar.showMessage(
        `${channelIds.length} channel(s) successfully added to Fav #${favNo}`
      )
      props.onChange()
    })
  }

  const save = () => {
    setIsSaving(true)
    Api.saveFile(props.match.params.scmPackageHash, props.match.params.scmFileId, modifiedChannels, () => {
      setModifiedChannels({})
      setIsSaving(false)
      props.onChange()
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

  let channelActions = []
  props.scmPackage.favorites.forEach(element => {
    channelActions.push({label: "Add to Fav #" + element.favNo, onClick: (channels, clearAfterSaving) => {addChannelsToFav(channels, element.favNo, clearAfterSaving)}})
  })

  return (
    isInitialized
      ? <ChannelList
          channels={channels}
          onChannelChange={handleChannelChange}
          channelActions={channelActions}
          optionButtons={modifiedChannelsAction}
        />
      : <h1>Loading...</h1>
  )
}