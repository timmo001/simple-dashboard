import React, { Fragment, ReactElement, useCallback, useState } from 'react';
import useEventListener from '@use-it/event-listener';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@mdi/react';
import {
  mdiAccountCircle,
  mdiCheck,
  mdiHomeAssistant,
  mdiMenu,
  mdiPencil,
  mdiViewDashboard,
} from '@mdi/js';

import HomeAssistantLoginPrompt from './HomeAssistant/HomeAssistantLoginPrompt';

const useStyles = makeStyles({
  list: {
    width: 280,
  },
  listItemsBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  spacer: {
    flex: 1,
  },
});

interface HeaderProps {
  editingConfiguration: boolean;
  hassConnected: boolean;
  loggedIn: boolean;
  handleEditConfiguration: () => void;
  handleHassLogin: (url: string) => void;
  handleLogin: () => void;
  handleLogout: () => void;
}

export default function Header(props: HeaderProps): ReactElement {
  const {
    editingConfiguration,
    hassConnected,
    loggedIn,
    handleEditConfiguration,
    handleHassLogin,
    handleLogin,
    handleLogout,
  } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [hassLoginPrompt, setHassLoginPrompt] = useState<boolean>(false);
  const [mouseMoved, setMouseMoved] = useState<boolean>(false);
  const [mouseOverMenuButton, setMouseOverMenuButton] = useState<boolean>(
    false
  );

  const mouseMoveHandler = useCallback(() => {
    setMouseMoved(true);
    setTimeout(() => setMouseMoved(false), 4000);
  }, [setMouseMoved]);

  useEventListener('mousemove', mouseMoveHandler);

  function handleMouseEnterMenuButton(): void {
    setMouseOverMenuButton(true);
  }

  function handleMouseLeaveMenuButton(): void {
    setMouseOverMenuButton(false);
  }

  function handleDrawerOpen(): void {
    setOpen(true);
  }

  function handleDrawerClose(): void {
    setOpen(false);
  }

  function handleHassLoginPrompt(): void {
    setHassLoginPrompt(true);
  }

  function handleHassLoginPromptClose(): void {
    setHassLoginPrompt(false);
  }

  const classes = useStyles();
  return (
    <Fragment>
      <Slide direction="down" in={mouseOverMenuButton || mouseMoved}>
        <AppBar
          position="fixed"
          color="inherit"
          onMouseEnter={handleMouseEnterMenuButton}
          onMouseOver={handleMouseEnterMenuButton}
          onMouseLeave={handleMouseLeaveMenuButton}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}>
              <Icon title="Menu" path={mdiMenu} color="#fafafa" size={1} />
            </IconButton>
            <div className={classes.spacer} />
            <IconButton
              color="inherit"
              aria-label="edit"
              onClick={handleEditConfiguration}>
              <Icon
                title="Edit"
                path={editingConfiguration ? mdiCheck : mdiPencil}
                color="#fafafa"
                size={1}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>

      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}>
        <div
          className={classes.list}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Icon
                  title="Simple Dashboard"
                  path={mdiViewDashboard}
                  color="#fafafa"
                  size={1}
                />
              </ListItemIcon>
              <ListItemText primary="Simple Dashboard" />
            </ListItem>
            <Divider light />
          </List>
          <List className={classes.listItemsBottom}>
            <Divider light />
            {!hassConnected && (
              <ListItem button onClick={handleHassLoginPrompt}>
                <ListItemIcon>
                  <Icon
                    title="Login to Home Assistant"
                    path={mdiHomeAssistant}
                    color="#fafafa"
                    size={1}
                  />
                </ListItemIcon>
                <ListItemText primary="Login to Home Assistant" />
              </ListItem>
            )}
            <ListItem button onClick={loggedIn ? handleLogout : handleLogin}>
              <ListItemIcon>
                <Icon
                  title={`Log${loggedIn ? 'out' : 'in'}`}
                  path={mdiAccountCircle}
                  color="#fafafa"
                  size={1}
                />
              </ListItemIcon>
              <ListItemText primary={`Log${loggedIn ? 'out' : 'in'}`} />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
      {hassLoginPrompt && (
        <HomeAssistantLoginPrompt
          handleClose={handleHassLoginPromptClose}
          handleHassLogin={handleHassLogin}
        />
      )}
    </Fragment>
  );
}
