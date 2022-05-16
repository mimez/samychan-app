import { AutoSizer } from 'react-virtualized';
import { FixedSizeList as List } from 'react-window';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Channel from './Channel';

const ChannelListChannels = function ChannelListChannels({
  channels,
  onChannelChange,
  onSelectionChange,
  channelNameReadOnly,
  selectedChannels,
}) {
  const [cursorPos, setCursorPos] = useState({ channelId: 0, field: 'no' });

  const handleKeyNavigation = (dir, field) => {
    let currentIndex;
    let newIndex;

    /* eslint-disable */
    for (const i in channels) {
      if (cursorPos.channelId !== channels[i].channelId) {
        continue;
      }
      currentIndex = parseInt(i, 10);
      switch (dir) {
        case 'left':
          newIndex = currentIndex - 1;
          break;
        case 'right':
          newIndex = currentIndex + 1;
          break;
        case 'down':
          newIndex = currentIndex + 1;
          break;
        case 'up':
          newIndex = currentIndex - 1;
          break;
        case 'current':
          newIndex = currentIndex;
          break;
        default:
      }
      /* eslint-enable */
      if (typeof channels[newIndex] !== 'undefined') {
        setCursorPos({ channelId: channels[newIndex].channelId, field, selectedChannels });
      }
    }
  };

  const handleChannelChange = (channel) => {
    if (typeof onChannelChange === 'function') {
      onChannelChange(channel);
    }
  };

  const handleCursorChange = (channelId, field) => {
    setCursorPos({ channelId, field });
  };

  const handleSelectionChange = (channelId) => {
    onSelectionChange(channelId);
  };

  let channelTabIndex = 0;

  /* eslint-disable */
  const Row = function ({ index, style }) {
    const channel = channels[index];
    const selected = selectedChannels.indexOf(channel.channelId) !== -1;
    channelTabIndex += 1;

    return (
      <Channel
        channelData={channel}
        key={channel.channelId}
        channelTabIndex={channelTabIndex}
        onChannelChange={handleChannelChange}
        onKeyNavigation={handleKeyNavigation}
        onCursorChange={handleCursorChange}
        cursorPos={cursorPos}
        style={style}
        onSelectionChange={handleSelectionChange}
        selected={selected}
        channelNameReadOnly={channelNameReadOnly}
      />
    );
  };
  /* eslint-enable */

  return (
    <div id="channel-list-container">
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={channels.length}
            itemSize={55}
            width={width}
            className="channels"
            overscanCount={5}
            itemData={channels}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

ChannelListChannels.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    channelId: PropTypes.number,
    channelNo: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  onChannelChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  channelNameReadOnly: PropTypes.bool,
  selectedChannels: PropTypes.arrayOf(PropTypes.number),
};
ChannelListChannels.defaultProps = {
  onChannelChange: () => {},
  onSelectionChange: () => {},
  channelNameReadOnly: () => {},
  selectedChannels: [],
};

export default ChannelListChannels;
