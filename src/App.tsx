import React, { ReactElement } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import 'typeface-roboto';

import Main from './Main';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: grey,
    secondary: grey,
    background: {
      default: '#000000',
      paper: '#121212',
    },
  },
});

export default function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}
