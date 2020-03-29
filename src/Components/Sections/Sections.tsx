import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid, {
  GridContentAlignment,
  GridItemsAlignment,
  GridJustification,
} from '@material-ui/core/Grid';

import { BaseProps } from '../Types';
import { Item } from './Item';
import Add from '../Generic/Add';
import Items from './Items';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
  degree: {
    verticalAlign: 'top',
  },
  border: {
    border: '1px solid rgba(250, 250, 250, 0)',
  },
  borderActive: {
    border: '1px solid rgba(250, 250, 250, 0.8)',
  },
}));

export interface Section {
  id: string;
  alignItems?: GridItemsAlignment;
  alignContent?: GridContentAlignment;
  justify?: GridJustification;
  size?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  items?: Item[];
}

export interface SectionsProps extends BaseProps {
  sections: Section[];
}

export default function Sections(props: SectionsProps): ReactElement {
  const { sections, editingConfiguration } = props;

  const classes = useStyles();
  return (
    <Grid
      className={clsx(
        classes.root,
        editingConfiguration ? classes.borderActive : classes.border
      )}
      container
      direction="row"
      justify="space-between"
      alignItems="stretch">
      {sections &&
        sections.map(
          (section: Section, sectionKey: number): ReactElement => (
            <Grid
              key={sectionKey}
              className={clsx(
                editingConfiguration ? classes.borderActive : classes.border
              )}
              item
              xs={section.size || 6}
              container
              direction="row"
              alignContent={section.alignContent}
              alignItems={section.alignItems}
              justify={section.justify}>
              {section.items && (
                <Items {...props} section={section} items={section.items} />
              )}
              {editingConfiguration && <Add {...props} section={section} />}
            </Grid>
          )
        )}
      {editingConfiguration && <Add {...props} />}
    </Grid>
  );
}
