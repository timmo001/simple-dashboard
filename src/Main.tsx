import React, { Fragment, ReactElement, useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid, {
  GridItemsAlignment,
  GridContentAlignment,
  GridJustification,
} from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
  degree: {
    verticalAlign: 'top',
  },
}));

export interface Section {
  alignItems?: GridItemsAlignment;
  alignContent?: GridContentAlignment;
  justify?: GridJustification;
  size?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  items?: Item[];
}

export interface Item {
  size?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  data?: ReactElement;
}

interface SpacerProps {
  space?: number;
}

export function Spacer(props: SpacerProps): ReactElement {
  const theme = useTheme();
  return <span style={{ margin: theme.spacing(props.space || 1) }} />;
}

export function Degree(): ReactElement {
  const classes = useStyles();
  return (
    <Typography className={classes.degree} variant="h4" component="span">
      °C
    </Typography>
  );
}

export function Percent(): ReactElement {
  return (
    <Typography variant="h4" component="span">
      %
    </Typography>
  );
}

export default function Main(): ReactElement {
  const [sections, setSections] = useState<Section[]>();

  useEffect(() => {
    setSections([
      {
        alignItems: 'center',
        alignContent: 'flex-start',
        justify: 'flex-start',
        size: 12,
        items: [
          {
            size: 12,
            data: (
              <Box textAlign="center">
                <Typography variant="h1" component="span">
                  {moment().format('hh:mm')}
                </Typography>
                <Spacer space={0.5} />
                <Typography variant="h3" component="span">
                  {moment().format('a')}
                </Typography>
                <Spacer />
              </Box>
            ),
          },
          {
            size: 12,
            data: (
              <Box textAlign="center">
                <Typography variant="h2" component="span">
                  {moment().format('Do MMMM YYYY')}
                </Typography>
              </Box>
            ),
          },
        ],
      },
      {
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        justify: 'flex-start',
        size: 6,
        items: [
          {
            data: (
              <Typography variant="h4" component="span">
                Living Room
              </Typography>
            ),
            size: 3,
          },
          {
            data: (
              <Box>
                <Typography variant="h2" component="span">
                  22.4
                </Typography>
                <Spacer space={0.25} />
                <Degree />
                <Spacer space={2} />
                <Typography variant="h2" component="span">
                  46
                </Typography>
                <Spacer space={0.25} />
                <Percent />
              </Box>
            ),
            size: 9,
          },
          {
            data: (
              <Typography variant="h4" component="span">
                Kitchen
              </Typography>
            ),
            size: 3,
          },
          {
            data: (
              <Box>
                <Typography variant="h2" component="span">
                  21.6
                </Typography>
                <Spacer space={0.25} />
                <Degree />
                <Spacer space={2} />
                <Typography variant="h2" component="span">
                  54
                </Typography>
                <Spacer space={0.25} />
                <Percent />
              </Box>
            ),
            size: 9,
          },
          {
            data: (
              <Typography variant="h4" component="span">
                Outside
              </Typography>
            ),
            size: 3,
          },
          {
            data: (
              <Box>
                <Typography variant="h2" component="span">
                  10.2
                </Typography>
                <Spacer space={0.25} />
                <Degree />
                <Spacer space={2} />
                <Typography variant="h2" component="span">
                  46
                </Typography>
                <Spacer space={0.25} />
                <Percent />
              </Box>
            ),
            size: true,
          },
        ],
      },
    ]);
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
        {sections &&
          sections.map(
            (section: Section, sectionKey: number): ReactElement => (
              <Grid
                key={sectionKey}
                item
                xs={section.size || 6}
                container
                direction="row"
                justify={section.justify}
                alignContent={section.alignContent}
                alignItems={section.alignItems}>
                {section.items &&
                  section.items.map(
                    (item: Item, itemKey: number): ReactElement => (
                      <Grid key={itemKey} item xs={item.size || 'auto'}>
                        {item.data}
                      </Grid>
                    )
                  )}
              </Grid>
            )
          )}
      </Grid>
    </Fragment>
  );
}
