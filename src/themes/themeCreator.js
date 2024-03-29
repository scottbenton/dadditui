import { createMuiTheme } from "@material-ui/core/styles";

import { lightTheme } from "themes/lightTheme";
import { blueTheme } from "themes/blueTheme";
import { darkBlueTheme } from "themes/darkBlueTheme";
import { lightTealTheme } from "themes/lightTealTheme";
import { lightBlueTheme } from "themes/lightBlueTheme";

export const themes = {
  light: lightTheme,
  blue: blueTheme,
  darkBlue: darkBlueTheme,
  lightTeal: lightTealTheme,
  lightBlue: lightBlueTheme
};

export const DEFAULT_THEME = "lightTeal";

export const constructMuiTheme = theme =>
  createMuiTheme({
    palette: {
      type: theme.type,
      primary: { main: theme.primary },
      secondary: { main: theme.secondary },
      background: {
        default: theme.background,
        paper: theme.paper
      }
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Open Sans",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(",")
    }
  });
