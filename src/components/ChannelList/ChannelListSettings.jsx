import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SortIcon from '@mui/icons-material/Sort';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ExportIcon from '@mui/icons-material/InsertDriveFile';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: '1rem',
  },
  toolbar: {
    paddingTop: '30px',
    paddingBottom: '20px',
  },
}));

const ChannelListSettings = function ChannelListSettings({
  onFilterTextChange,
  onSortChange,
  exportUrl,
  selectedChannels,
  channelActions,
  onOptionButtonSuccess,
  optionButtons,
  headline,
  filterText,
}) {
  const classes = useStyles();

  const [sortPopperIsVisible, setSortPopperIsVisible] = useState(false);
  const [selectionPopperIsVisible, setSelectionPopperIsVisible] = useState(false);
  const [channelActionIsInProgress, setChannelActionIsInProgress] = useState(false);

  const sortAnchorRef = React.useRef(null);
  const selectionAnchorRef = React.useRef(null);

  const sortOptions = [
    {
      label: 'channel no asc', field: 'channel_no', dir: 'asc', type: 'number',
    },
    {
      label: 'channel no desc', field: 'channel_no', dir: 'desc', type: 'number',
    },
    {
      label: 'name asc', field: 'name', dir: 'asc', type: 'text',
    },
    {
      label: 'name desc', field: 'name', dir: 'desc', type: 'text',
    },
  ];

  const handleFilterTextChange = (e) => {
    onFilterTextChange(e.target.value);
  };

  const handleSortChange = (sortOption) => {
    onSortChange(sortOption.field, sortOption.dir, sortOption.type);
    setSortPopperIsVisible(false);
  };

  const handleExport = () => {
    window.open(exportUrl);
  };

  let optionsButton;
  if (selectedChannels.length > 0 && channelActions.length > 0) {
    optionsButton = (
      <span>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setSelectionPopperIsVisible(true)}
          ref={selectionAnchorRef}
          className={classes.button}
        >
          {selectedChannels.length}
          {' '}
          items selected
          {channelActionIsInProgress && <CircularProgress size={24} />}
          <ExpandMoreIcon />
        </Button>
        <Popper open={selectionPopperIsVisible} anchorEl={selectionAnchorRef.current}>
          <Paper>
            <ClickAwayListener onClickAway={() => setSelectionPopperIsVisible(false)}>
              <MenuList>
                {channelActions.map((item, key) => (
                  <MenuItem
                    // eslint-disable-next-line
                    key={key}
                    onClick={() => {
                      item.onClick(selectedChannels, () => {
                        setChannelActionIsInProgress(false);
                        onOptionButtonSuccess();
                      });
                      setChannelActionIsInProgress(true);
                      setSelectionPopperIsVisible(false);
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </span>
    );
  }

  let exportButton;
  if (exportUrl !== undefined && exportUrl !== null && exportUrl.length > 0) {
    exportButton = (
      <Tooltip title="Export as CSV">
        <IconButton
          aria-label="delete"
          size="large"
          onClick={handleExport}
        >
          <ExportIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    // eslint-disable-next-line
    <Toolbar className="channel-list-settings" className={classes.toolbar}>
      <div>
        {optionsButton}
        {optionButtons}
      </div>
      <Typography variant="h4" component="h1" noWrap className={classes.title}>
        {headline}
      </Typography>
      <div>
        <TextField
          label="Search..."
          value={filterText}
          onChange={handleFilterTextChange}
          variant="standard"
        />
        {exportButton}
        <Tooltip title="Change sort" open={sortPopperIsVisible ? false : undefined}>
          <IconButton
            ref={sortAnchorRef}
            aria-label="change sort"
            onClick={() => setSortPopperIsVisible(true)}
            size="large"
          >
            <SortIcon />
          </IconButton>
        </Tooltip>
        <Popper open={sortPopperIsVisible} anchorEl={sortAnchorRef.current}>
          <Paper>
            <ClickAwayListener onClickAway={() => setSortPopperIsVisible(false)}>
              <MenuList>
                {sortOptions.map((sortOption) => (
                  <MenuItem key={sortOption.label} onClick={() => handleSortChange(sortOption)}>
                    {sortOption.label}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </div>
    </Toolbar>
  );
};

ChannelListSettings.propTypes = {
  onFilterTextChange: PropTypes.func,
  onSortChange: PropTypes.func,
  exportUrl: PropTypes.string,
  selectedChannels: PropTypes.arrayOf(PropTypes.number),
  channelActions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  })),
  onOptionButtonSuccess: PropTypes.func,
  optionButtons: PropTypes.element,
  headline: PropTypes.string.isRequired,
  filterText: PropTypes.string,
};
ChannelListSettings.defaultProps = {
  onFilterTextChange: () => {},
  onSortChange: () => {},
  exportUrl: undefined,
  selectedChannels: [],
  channelActions: [],
  onOptionButtonSuccess: () => {},
  optionButtons: undefined,
  filterText: '',
};

export default ChannelListSettings;
