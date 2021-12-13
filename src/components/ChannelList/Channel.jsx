import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: (selected) => ({
    boxSizing: 'border-box',
    marginBottom: '5px',
    marginRight: '5px',
    width: '100%',
    overflow: 'hidden',
    background: selected ? theme.palette.primary.light : '',
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px',
    "& input:not([type='checkbox'])": {
      border: '0',
      backgroundColor: 'transparent',
      width: '50px',
    },
    "&:hover input:not([type='checkbox']), & input:focus": {
      outline: 'none',
      background: '#33333321',
    },
    '& input.name, & input.channel-no': {
      display: 'inline-block',
      padding: '5px',
      marginRight: '1rem',
      /* color: "#fff" */
    },
    '& input.channel-no': {
      width: '60px',
      fontSize: '15px',
      textAlign: 'right',
      marginRight: '5px',
    },
    '& input.name': {
      flexGrow: 1,
      fontWeight: 'bolder',
      textOverflow: 'ellipsis',
      width: '10rem',
      overflow: 'hidden',
      fontSize: '15px',
      padding: '5px',
    },
    '&:focus, &:focus-within': {
      background: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  }),
}));

const Channel = React.memo(({
  channelData,
  cursorPos,
  onCursorChange,
  onChannelChange,
  onKeyNavigation,
  onSelectionChange,
  selected,
  channelTabIndex,
  channelNameReadOnly,
}) => {
  /**
   * Testplan
   * Creatign a good user expierience is very important for editing a whole bunch of channels.
   * Users are very different, some users will use mouse navigation others will use key-board
   * navigation very heavily
   * We have many different points to check, so there is a manual test plan to check:
   *
   * - Keyboard-Navigation without changes works properly (navigating by tab, enter, key-down/up)
   * - By clicking on a INPUT starts the edit mode and the input gets focused
   * - By entering the edit-mode the text / number gets selected
   * - If we click again we can set the cursor to a specific char
   * - writing inside the input works
   * - After editing a value and bluring the input it gets saved
   * - After ediiting a value and doing keyboard-navigation (enter / key down) we get to the
   *   expected row
   * - Saving by tabs works properly
   */

  /**
   * We have a local state for editing the channel. By entering the edit-mode we copy
   * the parent-state into the local state. After leaving the edit-mode we trigger a
   * event so the parent component can handle the change
   */
  const [isEditMode, setIsEditMode] = useState(false);
  const [channelNo, setChannelNo] = useState('');
  const [channelName, setChannelName] = useState('');
  const classes = useStyles(selected);

  /**
   * Notify parent about cursor position (active field)
   * @param field
   */
  const notifyCursorPos = (field) => {
    // if cursor-position is update, we nothing to do
    if (cursorPos.channelId === channelData.channelId && cursorPos.field === field) {
      return;
    }

    // call parent event handler
    onCursorChange(channelData.channelId, field);
  };

  /**
   * Activate the Edit-Mode and set the the current name/channel-no for modification
   * @param event
   */
  const enterEditMode = () => {
    if (isEditMode) {
      return;
    }

    setIsEditMode(true);
    setChannelName(channelData.name);
    setChannelNo(channelData.channelNo);
  };

  /**
   * Focus name / number-field
   * 1) We select all the text (it should by more user friendly)
   * 2) By focusing the input, we notify the parent about the new cursor position
   * 3) We enter the edit mode
   * @param event
   */
  const focusInput = (event) => {
    event.target.select();
    notifyCursorPos(event.target.dataset.field);
    enterEditMode(event);
  };

  /**
   * Disable Edit Mode
   * By disabling edit mode we trigger the onChannelChange event (if any data has changed),
   * so the parent component can handle the change
   */
  const disableEditMode = (nextChannelToEnter, nextFieldToEnter) => {
    setIsEditMode(false);

    // check if anything has changed, in case if not, do nothing anymore
    if (channelData.name !== channelName || channelData.channelNo !== channelNo) {
      const newData = {};
      newData.name = channelName;
      newData.channelNo = channelNo;
      onChannelChange({ ...channelData, ...newData });
    }

    // navigate to next channel if requested
    if (['up', 'down', 'current'].includes(nextChannelToEnter)) {
      onKeyNavigation(nextChannelToEnter, nextFieldToEnter);
    } else {
      onCursorChange(0, null);
    }
  };

  /**
   * Blur Event
   * We just land here if we blur the input by mouse. Navigating by keyboard will not result in
   * bluring input
   * @param event
   */
  const blurInput = () => {
    disableEditMode(0, null);
  };

  /**
   * Keboard-Navigation
   * @param event
   */
  const handleKeyNav = (event) => {
    const keys = {
      38: 'up', // KEY_UP
      40: 'down', // KEY_DOWN
      13: 'down', // ENTER
    };

    // tab and current field is "name" then switch to next channel
    if (event.shiftKey && event.keyCode === 9 && event.target.dataset.field === 'no') {
      disableEditMode('up', 'name');
      event.preventDefault();
    } else if (event.shiftKey && event.keyCode === 9 && event.target.dataset.field === 'name') {
      disableEditMode('current', 'no');
      event.preventDefault();
    } else if (event.keyCode === 9 && event.target.dataset.field === 'name') {
      disableEditMode('down', 'no');
      event.preventDefault();
    } else if (event.keyCode === 9 && event.target.dataset.field === 'no') {
      disableEditMode('current', 'name');
      event.preventDefault();
    }

    if (event.keyCode in keys) {
      disableEditMode(keys[event.keyCode], event.target.dataset.field);
      event.preventDefault();
    }
  };

  const toggleChannelSelection = () => {
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(channelData.channelId);
    }
  };

  return (
    <div>
      <div
        className={classes.root}
        onKeyDown={handleKeyNav}
        id={`channel-${channelData.channelId}`}
        role="button"
        tabIndex="0"
      >
        <Checkbox
          onChange={toggleChannelSelection}
          checked={selected}
          color="secondary"
        />
        <input
          type="text"
          className="channel-no"
          data-field="no" // field-type for cursorPos
          tabIndex={channelTabIndex * 10000 + 1} // tabIndex for looping through inputs by tab
          value={isEditMode ? channelNo : channelData.channelNo}
          readOnly={!isEditMode}
          onChange={(e) => { setChannelNo(e.target.value); }}
          onFocus={focusInput} // if we get the focus we automatically enter the editmodus
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={cursorPos.channelId === channelData.channelId && cursorPos.field === 'no'}
          onBlur={blurInput}
        />
        <input
          type="text"
          className="name"
          data-field="name"
          tabIndex={channelTabIndex * 10000 + 2}
          value={isEditMode ? channelName : channelData.name}
          onChange={(e) => { setChannelName(e.target.value); }}
          onFocus={focusInput}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={cursorPos.channelId === channelData.channelId && cursorPos.field === 'name'}
          onBlur={blurInput}
          readOnly={channelNameReadOnly}
        />
      </div>
    </div>
  );
});

Channel.propTypes = {
  channelData: PropTypes.arrayOf(PropTypes.shape({
    channelNo: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  cursorPos: PropTypes.shape({
    channelId: PropTypes.number,
    field: PropTypes.string,
  }),
  onCursorChange: PropTypes.func,
  onChannelChange: PropTypes.func,
  onKeyNavigation: PropTypes.func,
  onSelectionChange: PropTypes.func,
  selected: PropTypes.bool,
  channelTabIndex: PropTypes.number,
  channelNameReadOnly: PropTypes.bool,
};
Channel.defaultProps = {
  cursorPos: PropTypes.shape({
    channelId: 0,
    field: 'no',
  }),
  onCursorChange: () => {},
  onChannelChange: () => {},
  onKeyNavigation: () => {},
  onSelectionChange: () => {},
  selected: false,
  channelTabIndex: 0,
  channelNameReadOnly: false,
};

export default Channel;
