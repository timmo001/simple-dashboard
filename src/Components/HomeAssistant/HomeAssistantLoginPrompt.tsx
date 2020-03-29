import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

interface HomeAssistantLoginProps {
  handleClose: () => void;
  handleHassLogin: (url: string) => void;
}

function HomeAssistantLogin(props: HomeAssistantLoginProps): ReactElement {
  const [url, setUrl] = useState<string>(
    `${
      process.env.REACT_APP_API_PROTOCOL || window.location.protocol
    }//homeassistant.local:8123`
  );
  const [invalidText, setInvalidText] = useState<string>();

  const handleValidation = useCallback(() => {
    if (!url) {
      setInvalidText('No Home Assistant URL.');
      return;
    }
    if (!url.startsWith('http') || !url.includes('://')) {
      setInvalidText('Home Assistant URL invalid!');
      return;
    }
    if (window.location.protocol === 'https:') {
      if (url.startsWith('http:')) {
        setInvalidText('Your HASS instance must use SSL/https.');
        return;
      }
    }
    setInvalidText(undefined);
  }, [url]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setUrl(event.target.value);
    handleValidation();
  }

  function handleLogin(): void {
    props.handleHassLogin(url);
    props.handleClose();
  }

  return (
    <Dialog open>
      <DialogTitle>Log in to Home Assistant</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel htmlFor="url" shrink={true}>
            Home Assistant URL
          </InputLabel>
          <Input
            required
            id="url"
            type="text"
            placeholder="https://homeassistant.local:8123"
            inputProps={{
              autoFocus: true,
              autoCapitalize: 'none',
              autoComplete: 'url',
            }}
            value={url}
            onChange={handleChange}
          />
        </FormControl>
        {invalidText && (
          <Typography color="error" variant="subtitle1">
            {invalidText}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button disabled={invalidText ? true : false} onClick={handleLogin}>
          Log in
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HomeAssistantLogin;
