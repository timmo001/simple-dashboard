import React, { Fragment, ReactElement } from 'react';
import moment from 'moment';
import { AlignSelfProperty, TextAlignProperty } from 'csstype';
import { Variant } from '@material-ui/core/styles/createTypography';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Spacer from '../Generic/Spacer';

export interface Item {
  type: 'date' | 'spacer' | 'text';
  data?: string;
  alignSelf?: AlignSelfProperty;
  textAlign?: TextAlignProperty;
  size?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  space?: number;
  variant?: Variant;
}

export interface ItemsProps {
  items: Item[];
}

function Item(props: Item): ReactElement | null {
  const { data, type, space, variant } = props;

  switch (type) {
    default:
      return null;
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
  const { items } = props;

  return (
    <Fragment>
      {items.map(
        (item: Item, itemKey: number): ReactElement => (
          <Grid
            key={itemKey}
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
