import React, { ReactElement } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid, {
  GridItemsAlignment,
  GridContentAlignment,
  GridJustification,
} from '@material-ui/core/Grid';

import Items, { Item } from './Items';

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

export interface SectionsProps {
  sections: Section[];
}

export default function Sections(props: SectionsProps): ReactElement {
  const { sections } = props;

  const classes = useStyles();
  return (
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
              {section.items && <Items items={section.items} />}
            </Grid>
          )
        )}
    </Grid>
  );
}
