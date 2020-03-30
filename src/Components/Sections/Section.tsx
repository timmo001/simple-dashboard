import React, { Fragment, ReactElement, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid, {
  GridContentAlignment,
  GridItemsAlignment,
  GridJustification,
} from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react';
import { mdiPencil } from '@mdi/js';

import { BaseProps } from '../Types';
import { Item } from './Item';
import Add from '../Generic/Add';
import EditSection from './EditSection';
import Items from './Items';

const useStyles = makeStyles(() => ({
  border: {
    border: '1px solid rgba(250, 250, 250, 0)',
  },
  borderActive: {
    border: '1px solid rgba(250, 250, 250, 0.8)',
  },
  buttonBase: {
    height: '100%',
    width: '100%',
  },
}));

export interface Section {
  id: string;
  alignContent?: GridContentAlignment;
  alignItems?: GridItemsAlignment;
  justify?: GridJustification;
  size?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  items?: Item[];
}

export interface SectionProps extends BaseProps {
  forceBorder?: boolean;
  section: Section;
}

export default function Section(props: SectionProps): ReactElement {
  const { section, editingConfiguration, forceBorder } = props;
  const { alignContent, alignItems, items, justify, size } = section;

  const [editingSection, setEditingSection] = useState<boolean>(false);

  function handleEditSection(): void {
    if (editingConfiguration) setEditingSection(true);
  }

  function handleEditSectionComplete(): void {
    setEditingSection(false);
  }

  const classes = useStyles();
  return (
    <Fragment>
      <Grid
        className={clsx(
          forceBorder || editingConfiguration
            ? classes.borderActive
            : classes.border
        )}
        item
        xs={size || 6}
        container
        direction="row"
        alignContent={alignContent}
        alignItems={alignItems}
        justify={justify}>
        {items && <Items {...props} section={section} items={items} />}
        <Grid item>
          {editingConfiguration && <Add {...props} section={section} />}
        </Grid>
        {editingConfiguration && (
          <Grid item>
            <IconButton onClick={handleEditSection}>
              <Icon
                title="Edit Section"
                path={mdiPencil}
                color="#fafafa"
                size={1}
              />
            </IconButton>
          </Grid>
        )}
      </Grid>
      {editingSection && (
        <EditSection
          {...props}
          handleEditSectionComplete={handleEditSectionComplete}
        />
      )}
    </Fragment>
  );
}
