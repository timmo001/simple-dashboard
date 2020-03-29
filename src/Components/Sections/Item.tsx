import React, { ReactElement, useState } from 'react';
import moment from 'moment';
import { AlignSelfProperty, TextAlignProperty } from 'csstype';
import { makeStyles } from '@material-ui/core/styles';
import { Variant } from '@material-ui/core/styles/createTypography';
import Typography from '@material-ui/core/Typography';

import { BaseProps } from '../Types';
import { Section } from './Sections';
import EditItem from './EditItem';
import Spacer from '../Generic/Spacer';

const useStyles = makeStyles(() => ({
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

export default function Item(props: ItemProps): ReactElement {
  const { editingConfiguration, section, item } = props;
  const { data, space, type, variant } = item;

  const [editingItem, setEditingItem] = useState<boolean>(false);

  function handleEditItem(): void {
    if (editingConfiguration) setEditingItem(true);
  }

  function handleEditItemComplete(): void {
    setEditingItem(false);
  }

  const classes = useStyles();

  if (editingItem)
    return (
      <EditItem
        {...props}
        section={section}
        item={item}
        handleEditItemComplete={handleEditItemComplete}
      />
    );

  switch (type) {
    case 'date':
      return (
        <Typography
          className={classes.text}
          variant={variant}
          component="span"
          onClick={handleEditItem}>
          {moment().format(data)}
        </Typography>
      );
    case 'spacer':
      return <Spacer space={space} />;
    case 'text':
      return (
        <Typography
          className={classes.text}
          variant={variant}
          component="span"
          onClick={handleEditItem}>
          {data}
        </Typography>
      );
  }
}
