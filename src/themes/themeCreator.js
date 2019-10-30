import { createMuiTheme } from '@material-ui/core/styles';

import { lightTheme } from 'themes/lightTheme';
import { blueTheme } from 'themes/blueTheme';
import { darkBlueTheme } from 'themes/darkBlueTheme';
import { darkTheme } from 'themes/darkTheme';
import { lightBlueTheme } from 'themes/lightBlueTheme';

export const themes = {
  light: lightTheme,
  blue: blueTheme,
  darkBlue: darkBlueTheme,
  dark: darkTheme,
  lightBlue: lightBlueTheme
}

export const constructMuiTheme = theme => createMuiTheme({
  palette: {
    type: theme.type,
    primary: { main: theme.primary },
    secondary: { main: theme.secondary },
    background: {
      default: theme.background,
      paper: theme.paper,
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Open Sans',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});