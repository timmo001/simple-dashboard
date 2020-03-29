import React, { ReactElement, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Configuration } from '../Types';
import SectionItem, { Item, ItemProps } from './Item';
import { Section } from './Sections';
import clone from '../../utils/clone';

const useStyles = makeStyles((theme: Theme) => ({
  dialogContent: {
    padding: theme.spacing(1),
  },
  gridMain: {
    height: '100%',
  },
  gridForm: {
    padding: theme.spacing(2, 2, 2, 1),
  },
  preview: {
    padding: theme.spacing(1),
    background: theme.palette.background.default,
  },
}));

interface EditItemProps extends ItemProps {
  handleEditItemComplete: () => void;
}

export default function EditItem(props: EditItemProps): ReactElement {
  const {
    configuration,
    section,
    handleEditItemComplete,
    handleUpdateConfiguration,
  } = props;
  const [item, setItem] = useState<Item>(clone(props.item));
  const { type, data, alignSelf, textAlign, size, space, variant } = item;

  function handleSaveItem(): void {
    const newConfiguration: Configuration = clone(configuration);
    const sectionIndex = newConfiguration.sections.findIndex(
      (s: Section) => s.id === section.id
    );
    if (sectionIndex < 0) return;
    const itemIndex = newConfiguration.sections[sectionIndex].items?.findIndex(
      (i: Item) => i.id === item.id
    );
    if (itemIndex !== undefined && itemIndex < 0) return;

    const items = newConfiguration.sections[sectionIndex].items;
    if (itemIndex !== undefined && items) items[itemIndex] = item;

    handleUpdateConfiguration(newConfiguration);
    handleEditItemComplete();
  }

  const handleChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setItem({ ...item, [key]: event.target.value });
  };

  const classes = useStyles();
  return (
    <Dialog fullScreen open aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">Edit Item</DialogTitle>
      <DialogContent className={classes.dialogContent} dividers>
        <Grid className={classes.gridMain} container direction="row">
          <Grid
            className={classes.gridForm}
            item
            xs
            container
            direction="row"
            alignContent="flex-start"
            alignItems="flex-start"
            justify="flex-start"
            spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="type"
                label="Type"
                value={type}
                onChange={handleChange('type')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="size"
                label="Size"
                value={size}
                onChange={handleChange('size')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="data"
                label="Data"
                value={data}
                onChange={handleChange('data')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="alignSelf"
                label="Align"
                value={alignSelf}
                onChange={handleChange('alignSelf')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="textAlign"
                label="Text Align"
                value={textAlign}
                onChange={handleChange('textAlign')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="space"
                label="Space"
                value={space}
                onChange={handleChange('space')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="variant"
                label="Variant"
                value={variant}
                onChange={handleChange('variant')}
              />
            </Grid>
          </Grid>
          <Grid
            className={classes.preview}
            item
            xs={section.size}
            container
            direction="row"
            alignContent="center"
            justify="center">
            <Grid item xs={6}>
              <SectionItem
                {...props}
                editingConfiguration={false}
                item={item}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleEditItemComplete} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveItem} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
