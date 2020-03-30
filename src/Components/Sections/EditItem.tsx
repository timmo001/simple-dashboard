import React, { ReactElement, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Autocomplete, { RenderInputParams } from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Configuration } from '../Types';
import { Section } from './Section';
import { sizeOptions } from './EditSection';
import clone from '../../utils/clone';
import EntitySelect from '../HomeAssistant/Utils/EntitySelect';
import SectionItem, { Item, ItemProps } from './Item';

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

export const itemTypes = {
  date: {
    data: true,
    alignSelf: true,
    textAlign: true,
    size: true,
    spaceWide: false,
    spaceHigh: false,
    variant: true,
  },
  entity: {
    data: true,
    alignSelf: true,
    textAlign: true,
    size: true,
    spaceWide: false,
    spaceHigh: false,
    variant: true,
  },
  spacer: {
    data: false,
    alignSelf: false,
    textAlign: false,
    size: true,
    spaceWide: true,
    spaceHigh: true,
    variant: false,
  },
  text: {
    data: true,
    alignSelf: true,
    textAlign: true,
    size: true,
    spaceWide: false,
    spaceHigh: false,
    variant: true,
  },
};

export const typeOptions: string[] = ['date', 'entity', 'text', 'spacer'];

export const alignSelfOptions: string[] = [
  'auto',
  'baseline',
  'start',
  'center',
  'end',
  'flex-start',
  'flex-end',
  'justify',
  'normal',
  'self-start',
  'self-end',
  'stretch',
];

export const textAlignOptions: string[] = ['start', 'center', 'end', 'justify'];

export const variantOptions: string[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption',
];

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
  const {
    type,
    data,
    alignSelf,
    textAlign,
    size,
    spaceHigh,
    spaceWide,
    variant,
  } = item;

  const sizeString = size ? String(size) : undefined;

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
    let value: string | number | undefined = event.target.value;
    console.log(key, ':', value, ':', typeof value);
    switch (key) {
      case 'spaceHigh':
      case 'spaceWide':
        if (value === null || value === undefined) value = undefined;
        else value = Number(value);
        break;
    }
    console.log(key, ':', value, ':', typeof value);
    setItem({ ...item, [key]: value });
  };

  function handleEntityChange(value: string): void {
    setItem({ ...item, data: value });
  }

  const handleAutoCompleteChange = (key: string) => (
    _event: React.ChangeEvent<{}>,
    value: boolean | string | number | null | undefined
  ): void => {
    console.log(key, ':', value, ':', typeof value);
    switch (key) {
      case 'type':
        if (value === null || value === undefined) return;
        break;
      case 'size':
        if (value === null || value === undefined) value = undefined;
        else if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (!isNaN(Number(value))) value = Number(value);
        break;
    }
    console.log(key, ':', value, ':', typeof value);
    setItem({ ...item, [key]: value });
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
              <Autocomplete
                autoComplete
                autoHighlight
                autoSelect
                clearOnEscape
                id="type"
                value={type}
                options={typeOptions}
                onChange={handleAutoCompleteChange('type')}
                renderInput={(params: RenderInputParams): ReactElement => (
                  <TextField {...params} label="Type" />
                )}
              />
            </Grid>
            {itemTypes[type].size && (
              <Grid item xs={6}>
                <Autocomplete
                  autoComplete
                  autoHighlight
                  autoSelect
                  clearOnEscape
                  id="size"
                  value={sizeString}
                  options={sizeOptions}
                  onChange={handleAutoCompleteChange('size')}
                  renderInput={(params: RenderInputParams): ReactElement => (
                    <TextField {...params} label="Size" />
                  )}
                />
              </Grid>
            )}
            {itemTypes[type].data && (
              <Grid item xs={6}>
                {type === 'entity' ? (
                  <EntitySelect
                    {...props}
                    value={data}
                    handleChange={handleEntityChange}
                  />
                ) : (
                  <TextField
                    fullWidth
                    id="data"
                    label="Data"
                    value={data}
                    onChange={handleChange('data')}
                  />
                )}
              </Grid>
            )}
            {itemTypes[type].alignSelf && (
              <Grid item xs={6}>
                <Autocomplete
                  autoComplete
                  autoHighlight
                  autoSelect
                  clearOnEscape
                  id="alignSelf"
                  value={alignSelf}
                  options={alignSelfOptions}
                  onChange={handleAutoCompleteChange('alignSelf')}
                  renderInput={(params: RenderInputParams): ReactElement => (
                    <TextField {...params} label="Align" />
                  )}
                />
              </Grid>
            )}
            {itemTypes[type].textAlign && (
              <Grid item xs={6}>
                <Autocomplete
                  autoComplete
                  autoHighlight
                  autoSelect
                  clearOnEscape
                  id="textAlign"
                  value={textAlign}
                  options={textAlignOptions}
                  onChange={handleAutoCompleteChange('textAlign')}
                  renderInput={(params: RenderInputParams): ReactElement => (
                    <TextField {...params} label="Text Align" />
                  )}
                />
              </Grid>
            )}
            {itemTypes[type].spaceHigh && (
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  id="spaceHigh"
                  label="Space High"
                  value={spaceHigh}
                  onChange={handleChange('spaceHigh')}
                />
              </Grid>
            )}
            {itemTypes[type].spaceWide && (
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  id="spaceWide"
                  label="Space Wide"
                  value={spaceWide}
                  onChange={handleChange('spaceWide')}
                />
              </Grid>
            )}
            {itemTypes[type].variant && (
              <Grid item xs={6}>
                <Autocomplete
                  autoComplete
                  autoHighlight
                  autoSelect
                  clearOnEscape
                  id="variant"
                  value={variant}
                  options={variantOptions}
                  onChange={handleAutoCompleteChange('variant')}
                  renderInput={(params: RenderInputParams): ReactElement => (
                    <TextField {...params} label="Variant" />
                  )}
                />
              </Grid>
            )}
          </Grid>
          <Grid
            className={classes.preview}
            item
            xs={section.size}
            container
            direction="row"
            alignContent="center"
            justify="center">
            <SectionItem
              {...props}
              editingConfiguration={false}
              forceBorder
              item={item}
            />
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
