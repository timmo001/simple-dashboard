import React, { Fragment, ReactElement, useCallback, useState } from 'react';
import useEventListener from '@use-it/event-listener';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@mdi/react';
import {
  mdiAccountCircle,
  mdiMenu,
  mdiHomeAssistant,
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
  },
});

interface DrawerProps {
  loggedIn: boolean;
  hassConnected: boolean;
  handleHassLogin: (url: string) => void;
  handleLogin: () => void;
  handleLogout: () => void;
}

export default function Drawer(props: DrawerProps): ReactElement {
  const {
    loggedIn,
    hassConnected,
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
      <Fade in={mouseOverMenuButton || mouseMoved}>
        <AppBar position="fixed" color="transparent">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onMouseEnter={handleMouseEnterMenuButton}
              onMouseOver={handleMouseEnterMenuButton}
              onMouseLeave={handleMouseLeaveMenuButton}
              onClick={handleDrawerOpen}>
              <Icon title="Menu" path={mdiMenu} color="#fafafa" size={1} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Fade>

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
