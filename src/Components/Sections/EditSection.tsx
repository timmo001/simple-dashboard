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
import SectionInner, { Section, SectionProps } from './Section';
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

export const alignContentOptions: string[] = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'stretch',
];

export const alignItemsOptions: string[] = [
  'flex-start',
  'center',
  'flex-end',
  'baseline',
  'stretch',
];

export const justifyOptions: string[] = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];

export const sizeOptions: string[] = [
  'true',
  'false',
  'auto',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];

interface EditSectionProps extends SectionProps {
  handleEditSectionComplete: () => void;
}

export default function EditSection(props: EditSectionProps): ReactElement {
  const {
    configuration,
    handleEditSectionComplete,
    handleUpdateConfiguration,
  } = props;
  const [section, setSection] = useState<Section>(clone(props.section));
  const { alignContent, alignItems, justify, size } = section;

  const sizeString = size ? String(size) : undefined;

  function handleSaveSection(): void {
    const newConfiguration: Configuration = clone(configuration);
    const sectionIndex = newConfiguration.sections.findIndex(
      (s: Section) => s.id === section.id
    );
    if (sectionIndex < 0) return;

    newConfiguration.sections[sectionIndex] = section;

    handleUpdateConfiguration(newConfiguration);
    handleEditSectionComplete();
  }

  const handleAutoCompleteChange = (key: string) => (
    _event: React.ChangeEvent<{}>,
    value: boolean | string | number | null | undefined
  ): void => {
    if (key === 'size') {
      console.log(value);
      if (value === null || value === undefined) value = undefined;
      else if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (!isNaN(Number(value))) value = Number(value);
      console.log(value);
    }
    setSection({ ...section, [key]: value });
  };

  const classes = useStyles();
  return (
    <Dialog fullScreen open aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">Edit Section</DialogTitle>
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
                id="alignContent"
                value={alignContent}
                options={alignContentOptions}
                onChange={handleAutoCompleteChange('alignContent')}
                renderInput={(params: RenderInputParams): ReactElement => (
                  <TextField {...params} label="Align Content" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                autoComplete
                autoHighlight
                autoSelect
                clearOnEscape
                id="alignItems"
                value={alignItems}
                options={alignItemsOptions}
                onChange={handleAutoCompleteChange('alignItems')}
                renderInput={(params: RenderInputParams): ReactElement => (
                  <TextField {...params} label="Align Items" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                autoComplete
                autoHighlight
                autoSelect
                clearOnEscape
                id="justify"
                value={justify}
                options={justifyOptions}
                onChange={handleAutoCompleteChange('justify')}
                renderInput={(params: RenderInputParams): ReactElement => (
                  <TextField {...params} label="Justify" />
                )}
              />
            </Grid>
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
          </Grid>
          <Grid
            className={classes.preview}
            item
            xs={12}
            container
            direction="row"
            alignContent="center"
            justify="center">
            <SectionInner
              {...props}
              editingConfiguration={false}
              forceBorder
              section={section}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleEditSectionComplete} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveSection} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
