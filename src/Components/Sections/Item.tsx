import React, { Fragment, ReactElement, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { AlignSelfProperty, TextAlignProperty } from 'csstype';
import { makeStyles } from '@material-ui/core/styles';
import { Variant } from '@material-ui/core/styles/createTypography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { BaseProps } from '../Types';
import { Section } from './Sections';
import EditItem from './EditItem';
import Spacer from '../Generic/Spacer';

const useStyles = makeStyles(() => ({
  border: {
    border: '1px solid rgba(250, 250, 250, 0)',
  },
  borderActive: {
    border: '1px solid rgba(250, 250, 250, 0.8)',
  },
  text: {
    userSelect: 'none',
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

export interface ItemProps extends BaseProps {
  section: Section;
  item: Item;
}

function InnerItem(props: ItemProps): ReactElement {
  const { item } = props;
  const { data, space, type, variant } = item;

  const classes = useStyles();
  switch (type) {
    case 'date':
      return (
        <Typography className={classes.text} variant={variant} component="span">
          {moment().format(data)}
        </Typography>
      );
    case 'spacer':
      return <Spacer space={space} />;
    case 'text':
      return (
        <Typography className={classes.text} variant={variant} component="span">
          {data}
        </Typography>
      );
  }
}

export default function Item(props: ItemProps): ReactElement {
  const { editingConfiguration, item } = props;

  const [editingItem, setEditingItem] = useState<boolean>(false);

  function handleEditItem(): void {
    if (editingConfiguration) setEditingItem(true);
  }

  function handleEditItemComplete(): void {
    setEditingItem(false);
  }

  const classes = useStyles();
  return (
    <Fragment>
      <Grid
        className={clsx(
          editingConfiguration ? classes.borderActive : classes.border
        )}
        item
        xs={item.size || 'auto'}
        style={{
          alignSelf: item.alignSelf,
          textAlign: item.textAlign,
        }}>
        <ButtonBase
          component="div"
          disabled={!editingConfiguration}
          onClick={handleEditItem}>
          <InnerItem {...props} />
        </ButtonBase>
      </Grid>
      {editingItem && (
        <EditItem {...props} handleEditItemComplete={handleEditItemComplete} />
      )}
    </Fragment>
  );
}
