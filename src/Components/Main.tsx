import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { Auth, HassConfig, HassEntities } from 'home-assistant-js-websocket';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import { Configuration } from './Types';
import { parseTokens } from './HomeAssistant/Utils/Auth';
import Drawer from './Drawer';
import HomeAssistant from './HomeAssistant/HomeAssistant';
import Sections from './Sections/Sections';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
  degree: {
    verticalAlign: 'top',
  },
}));

interface MainProps {
  configuration: Configuration;
  loggedIn: boolean;
  handleConfigurationChange: (config: Configuration) => void;
  handleLogin: () => void;
  handleLogout: () => void;
}

export default function Main(props: MainProps): ReactElement {
  const { configuration, loggedIn, handleLogin, handleLogout } = props;
  const { sections } = configuration;

  const [hassAuth, setHassAuth] = useState<Auth>();
  const [hassConfig, setHassConfig] = useState<HassConfig>();
  const [hassConnected, setHassConnected] = useState<boolean>(false);
  const [hassEntities, setHassEntities] = useState<HassEntities>();
  const [hassLogin, setHassLogin] = useState<boolean>(false);
  const [hassUrl, setHassUrl] = useState<string>();

  useEffect(() => {
    if (window.location.search) parseTokens();
  }, []);

  useEffect(() => {
    if (!hassConnected) {
      const haUrl = localStorage.getItem('hass_url');
      if (haUrl) setHassUrl(haUrl);
    }
  }, [hassConnected]);

  useEffect(() => {
    if (!hassConnected) {
      const haUrl = localStorage.getItem('hass_url');
      if (haUrl) setHassUrl(haUrl);
    }
  }, [hassConnected]);

  async function handleHassLogin(url: string): Promise<void> {
    console.log('handleHassLogin:', url);
    setHassUrl(url);
    setHassLogin(true);
  }

  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Drawer
        loggedIn={loggedIn}
        hassConnected={hassConnected}
        handleHassLogin={handleHassLogin}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="space-between"
        alignItems="stretch">
        {sections && (
          <Sections
            sections={sections}
            hassAuth={hassAuth}
            hassConfig={hassConfig}
            hassEntities={hassEntities}
          />
        )}
      </Grid>
      {hassUrl && (
        <HomeAssistant
          url={hassUrl}
          login={hassLogin}
          setAuth={setHassAuth}
          setConfig={setHassConfig}
          setConnected={setHassConnected}
          setEntities={setHassEntities}
        />
      )}
    </Fragment>
  );
}
