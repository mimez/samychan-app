import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChannelListSettings from './ChannelListSettings';
import ChannelListChannels from './ChannelListChannels';

const ChannelList = function ChannelList({
  channels,
  onChannelChange,
  channelActions,
  optionButtons,
  headline,
  exportUrl,
  channelNameReadOnly,
}) {
  const defaultSort = { field: 'channel_no', dir: 'asc', type: 'number' };

  const [filter, setFilter] = useState({ text: '' });
  const [sort, setSort] = useState(defaultSort);
  const [selectedChannels, setSelectedChannels] = useState([]);

  /* eslint-disable */
  const filterChannels = (channels) => {
    const filteredChannels = [];
    for (const i in channels) {
      if (channels[i].name.toLowerCase().indexOf(filter.text.toLowerCase()) !== -1) {
        filteredChannels.push(channels[i]);
      }
    }
    return filteredChannels;
  };
  /* eslint-enable */

  const sortChannels = (channelsToSort) => {
    const retA = sort.dir === 'desc' ? 1 : -1;
    const retB = sort.dir === 'desc' ? -1 : 1;

    switch (sort.type) {
      case 'number':
        /* eslint-disable */
        channelsToSort.sort((a, b) => (parseInt(a[sort.field], 10) > parseInt(b[sort.field], 10) ? retA : retB));
        /* eslint-enable */
        break;
      case 'text':
      default:
        channelsToSort.sort((a, b) => (a[sort.field] > b[sort.field] ? retB : retA));
    }

    return channels;
  };

  const handleSortChange = (field, dir, type) => {
    setSort({ field, dir, type });
  };

  const getChannelsToDisplay = () => {
    let channelsToDisplay = filterChannels(channels);
    channelsToDisplay = sortChannels(channelsToDisplay);

    return channelsToDisplay;
  };

  const handleChannelChange = (channel) => {
    if (typeof onChannelChange === 'function') {
      onChannelChange(channel);
    }
  };

  const handleSelectionChange = (channelId) => {
    const newSelectedChannels = [...selectedChannels];
    const index = newSelectedChannels.indexOf(channelId);
    if (index === -1) {
      newSelectedChannels.push(channelId);
    } else {
      newSelectedChannels.splice(index, 1);
    }
    setSelectedChannels(newSelectedChannels);
  };

  const handleOptionButtonSuccess = () => {
    setSelectedChannels([]);
  };

  const channelsToDisplay = getChannelsToDisplay(channels);

  return (
    <div className="channel-list">
      <ChannelListSettings
        filterText={filter.text}
        sort={{ sortField: 'name', sortDir: 'desc', sortType: 'text' }}
        sortField={sort.field}
        sortDir={sort.dir}
        sortType={sort.type}
        onFilterTextChange={(text) => setFilter({ text })}
        onSortChange={handleSortChange}
        onSelectionChange={handleSelectionChange}
        selectedChannels={selectedChannels}
        channelActions={channelActions}
        optionButtons={optionButtons}
        onOptionButtonSuccess={handleOptionButtonSuccess}
        headline={headline}
        exportUrl={exportUrl}
      />
      <ChannelListChannels
        channels={channelsToDisplay}
        onChannelChange={handleChannelChange}
        onSelectionChange={handleSelectionChange}
        selectedChannels={selectedChannels}
        channelNameReadOnly={channelNameReadOnly}
      />
    </div>
  );
};

ChannelList.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    channelId: PropTypes.number,
    channelNo: PropTypes.number,
    name: PropTypes.string
  })).isRequired,
  onChannelChange: PropTypes.func,
  channelActions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired,
  optionButtons: PropTypes.element,
  headline: PropTypes.string,
  exportUrl: PropTypes.string,
  channelNameReadOnly: PropTypes.bool,
};
ChannelList.defaultProps = {
  onChannelChange: () => {},
  channelNameReadOnly: true,
};

export default ChannelList;
