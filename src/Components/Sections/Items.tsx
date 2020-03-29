import React, { Fragment, ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';

import { BaseProps } from '../Types';
import { Section } from './Sections';
import SectionItem, { Item } from './Item';

const useStyles = makeStyles(() => ({
  border: {
    border: '1px solid rgba(250, 250, 250, 0)',
  },
  borderActive: {
    border: '1px solid rgba(250, 250, 250, 0.8)',
  },
}));

interface ItemsProps extends BaseProps {
  section: Section;
  items: Item[];
}

export default function Items(props: ItemsProps): ReactElement {
  const { editingConfiguration, section, items } = props;

  const classes = useStyles();
  return (
    <Fragment>
      {items.map(
        (item: Item, itemKey: number): ReactElement => (
          <Grid
            key={itemKey}
            className={clsx(
              editingConfiguration ? classes.borderActive : classes.border
            )}
            item
            xs={item.size || 'auto'}
            style={{
              alignSelf: item.alignSelf,
              textAlign: item.textAlign,
            }}>
            <ButtonBase component="div" disabled={!editingConfiguration}>
              <SectionItem {...props} section={section} item={item} />
            </ButtonBase>
          </Grid>
        )
      )}
    </Fragment>
  );
}
