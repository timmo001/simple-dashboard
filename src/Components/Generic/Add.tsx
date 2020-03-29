import React, { ReactElement } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import { BaseProps, Configuration } from '../Types';
import { Section } from '../Sections/Sections';
import clone from '../../utils/clone';
import placeholderItem from '../Placeholders/Item';
import placeholderSection from '../Placeholders/Section';

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    margin: theme.spacing(0, 2),
  },
}));

interface AddProps extends BaseProps {
  section?: Section;
}

export default function Add(props: AddProps): ReactElement {
  const { configuration, section, handleUpdateConfiguration } = props;

  function handleAdd(): void {
    const newConfiguration: Configuration = clone(configuration);
    if (section) {
      const sectionIndex = newConfiguration.sections.findIndex(
        (s: Section) => s.id === section.id
      );
      if (sectionIndex < 0) return;
      newConfiguration.sections[sectionIndex].items?.push(placeholderItem());
    } else {
      newConfiguration.sections.push(placeholderSection());
    }
    handleUpdateConfiguration(newConfiguration);
  }

  const classes = useStyles();
  return (
    <IconButton
      className={classes.iconButton}
      color="inherit"
      aria-label="add"
      onClick={handleAdd}>
      <Icon title="Add" path={mdiPlus} color="#fafafa" size={1.5} />
    </IconButton>
  );
}
