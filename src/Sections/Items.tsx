import React, { Fragment, ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';

export interface Item {
  size?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  data?: ReactElement;
}

export interface ItemsProps {
  items: Item[];
}

export default function Items(props: ItemsProps): ReactElement {
  const { items } = props;

  return (
    <Fragment>
      {items.map(
        (item: Item, itemKey: number): ReactElement => (
          <Grid key={itemKey} item xs={item.size || 'auto'}>
            {item.data}
          </Grid>
        )
      )}
    </Fragment>
  );
}
