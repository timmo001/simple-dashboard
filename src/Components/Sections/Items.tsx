import React, { Fragment, ReactElement } from 'react';

import { BaseProps } from '../Types';
import { Section } from './Section';
import SectionItem, { Item } from './Item';

interface ItemsProps extends BaseProps {
  section: Section;
  items: Item[];
}

export default function Items(props: ItemsProps): ReactElement {
  const { section, items } = props;

  return (
    <Fragment>
      {items.map(
        (item: Item, itemKey: number): ReactElement => (
          <SectionItem key={itemKey} {...props} section={section} item={item} />
        )
      )}
    </Fragment>
  );
}
