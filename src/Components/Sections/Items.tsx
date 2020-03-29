import React, { Fragment, ReactElement } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { AlignSelfProperty, TextAlignProperty } from 'csstype';
import { makeStyles } from '@material-ui/core/styles';
import { Variant } from '@material-ui/core/styles/createTypography';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { BaseProps } from '../Types';
import Spacer from '../Generic/Spacer';

const useStyles = makeStyles(() => ({
  border: {
    border: '1px solid rgba(250, 250, 250, 0)',
  },
  borderActive: {
    border: '1px solid rgba(250, 250, 250, 0.8)',
  },
}));

export interface Item {
  id: string;
  type: 'date' | 'spacer' | 'text';
  data?: string;
  alignSelf?: AlignSelfProperty;
  textAlign?: TextAlignProperty;
  size?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  space?: number;
  variant?: Variant;
}

export interface ItemsProps extends BaseProps {
  items: Item[];
}

function Item(props: Item): ReactElement {
  const { data, type, space, variant } = props;

  switch (type) {
    case 'date':
      return (
        <Typography variant={variant} component="span">
          {moment().format(data)}
        </Typography>
      );
    case 'spacer':
      return <Spacer space={space} />;
    case 'text':
      return (
        <Typography variant={variant} component="span">
          {data}
        </Typography>
      );
  }
}

export default function Items(props: ItemsProps): ReactElement {
  const { editingConfiguration, items } = props;

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
            <Item {...item} />
          </Grid>
        )
      )}
    </Fragment>
  );
}
