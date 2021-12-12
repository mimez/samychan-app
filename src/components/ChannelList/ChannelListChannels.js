import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import React, { useState } from 'react';
import Channel from './Channel';

const ChannelListChannels = function (props) {
  const [cursorPos, setCursorPos] = useState({ channelId: 0, field: 'no' });

  const handleKeyNavigation = (dir, field) => {
    console.log('handleKeyNavigation');
    let currentIndex; let
      newIndex;
    for (const i in props.channels) {
      if (cursorPos.channelId !== props.channels[i].channelId) {
        continue;
      }
      currentIndex = parseInt(i);
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

      if (typeof props.channels[newIndex] !== 'undefined') {
        setCursorPos({ channelId: props.channels[newIndex].channelId, field });
      }
    }
  };

  const handleChannelChange = (channel) => {
    if (typeof props.onChannelChange === 'function') {
      props.onChannelChange(channel);
    }
  };

  const handleCursorChange = (channelId, field) => {
    setCursorPos({ channelId, field });
  };

  const handleSelectionChange = (channelId) => {
    props.onSelectionChange(channelId);
  };

  let channelTabIndex = 0;

  const Row = function ({ index, style }) {
    const channel = props.channels[index];
    const selected = props.selectedChannels.indexOf(channel.channelId) !== -1;
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
        channelNameReadOnly={props.channelNameReadOnly}
      />
    );
  };

  return (
    <div id="channel-list-container">
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={props.channels.length}
            itemSize={55}
            width={width}
            className="channels"
            overscanCount={5}
            itemData={props.channels}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default ChannelListChannels;
