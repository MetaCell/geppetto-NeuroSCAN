import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    caption: {
      fontSize: '18px',
      lineHeight: '23px',
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#f00',
      dark: '#000',
    },
    secondary: {
      main: '#000',
    },
    button: { main: '#fc6320' },
    toolbarBackground: { main: 'rgb(255,0,0,0.5)' },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        ' body': {
          backgroundColor: '#1c1c1c',
        },
        '.MuiBox-content': {
          display: 'flex',
          alignItems: 'flex-start',
          flex: 1,
          minHeight: '100vh',
          padding: '60px 24px 24px',
        },
        '.MuiBox-empty': {
          margin: 'auto',
          textAlign: 'center',
          '& span': {
            fontWeight: '600',
            display: 'block',
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
    },
    MuiAppBar: {
      root: {
        zIndex: 1300,
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: '40px !important',
      },
    },
  },
});

export default theme;
