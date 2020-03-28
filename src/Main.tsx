import React, { Fragment, ReactElement, useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Sections, { Section } from './Sections/Sections';
import placeholderSections from './Placeholders/Sections';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
  degree: {
    verticalAlign: 'top',
  },
}));

export default function Main(): ReactElement {
  const [sections, setSections] = useState<Section[]>();

  useEffect(() => {
    setSections(placeholderSections);
  }, []);

  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="space-between"
        alignItems="stretch">
        {sections && <Sections sections={sections} />}
      </Grid>
    </Fragment>
  );
}
