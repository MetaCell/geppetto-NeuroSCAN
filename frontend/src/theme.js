const { blue } = require('@material-ui/core/colors');
const { orange } = require('@material-ui/core/colors');
const { responsiveFontSizes } = require('@material-ui/core');
const { createMuiTheme } = require('@material-ui/core/styles');

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: { fontFamily: 'Roboto, Helvetica, Arial, sans-serif' },
    palette: {
      type: 'dark',
      primary: { main: orange[500] },
      secondary: { main: blue[500] },
      button: { main: '#fc6320' },
      toolbarBackground: { main: 'rgb(0,0,0,0.5)' },
    },
  }),
);

export default theme;
