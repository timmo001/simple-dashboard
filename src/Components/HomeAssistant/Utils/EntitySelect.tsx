import React, { Fragment, ReactElement } from 'react';
import { HassEntity } from 'home-assistant-js-websocket';
import Autocomplete, { RenderInputParams } from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { HomeAssistantEntityProps } from '../HomeAssistant';

interface EntitySelectProps extends HomeAssistantEntityProps {
  value?: string;
  handleChange: (value: string) => void;
}

function EntitySelect(props: EntitySelectProps): ReactElement {
  const { value, hassEntities, handleChange } = props;

  if (!hassEntities)
    return (
      <TextField
        fullWidth
        id="entity"
        label="Entity"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
          handleChange(event.target.value)
        }
      />
    );

  const entity: HassEntity | null = value ? hassEntities[value] : null;

  return (
    <Autocomplete
      autoComplete
      autoHighlight
      autoSelect
      clearOnEscape
      id="entity"
      value={entity}
      options={Object.values(hassEntities).filter(
        (e: HassEntity) => !e.entity_id.startsWith('device_tracker')
      )}
      getOptionLabel={(e: HassEntity): string => e.entity_id}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onChange={(_e: React.ChangeEvent<{}>, v: HassEntity | null): void => {
        if (v) handleChange(v.entity_id);
        else handleChange('');
      }}
      renderInput={(params: RenderInputParams): ReactElement => (
        <TextField {...params} label="Entity" />
      )}
      renderOption={(e: HassEntity): ReactElement => (
        <Box>
          {e.attributes.friendly_name && (
            <Fragment>
              {e.attributes.friendly_name}
              <br />
            </Fragment>
          )}
          <Typography component="span" variant="caption">
            {e.entity_id}
          </Typography>
        </Box>
      )}
    />
  );
}

export default EntitySelect;
