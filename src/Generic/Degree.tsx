import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  degree: {
    verticalAlign: 'top',
  },
}));

export default function Degree(): ReactElement {
  const classes = useStyles();
  return (
    <Typography className={classes.degree} variant="h4" component="span">
      °C
    </Typography>
  );
}
