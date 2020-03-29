import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { BaseProps } from '../Types';
import Add from '../Generic/Add';
import SectionInner, { Section } from './Section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
  border: {
    border: '1px solid rgba(250, 250, 250, 0)',
  },
  borderActive: {
    border: '1px solid rgba(250, 250, 250, 0.8)',
  },
}));

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
            <SectionInner key={sectionKey} {...props} section={section} />
          )
        )}
      {editingConfiguration && <Add {...props} />}
    </Grid>
  );
}
