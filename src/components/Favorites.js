import React, {useEffect, useState} from "react"
import ChannelList from "./ChannelList";
import Api from "../utils/Api";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import {useSnackbar} from 'material-ui-snackbar-provider'

export default (props) => {

  const snackbar = useSnackbar()
  const [channels, setChannels] = useState([])
  const channelListOptions = [
    <Tooltip title="Add channel">
      <Fab color="secondary" size="medium" aria-label="add">
        <AddIcon />
      </Fab>
    </Tooltip>
  ]

  useEffect(() => {
    initData()
  }, [props.match.params.scmPackageHash, props.match.params.favNo])

  const initData = () => {
    Api.getFavorites(props.match.params.scmPackageHash, props.match.params.favNo, (data) => {
      setChannels(data.selectedChannels)
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

  let channelActions = [
    {label: "Remove from Fav", onClick: (channels, clearAfterSaving) => {removeChannelsFromFav(channels, 1, clearAfterSaving)}},
  ]

  return (
    <ChannelList
      channels={channels}
      channelActions={channelActions}
    />
  );
}
