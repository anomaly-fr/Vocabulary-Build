/* eslint-disable import/prefer-default-export */
import { createMuiTheme } from '@material-ui/core';

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff5e62', // Color over white
      dark: '#E85F5E',
      light: '#ff9966',
      contrastText: '#FFFFFF'

    },
    secondary: {
      main: '#FFFFFF',
      dark: '#F9F9F9',


    },


  },
});
