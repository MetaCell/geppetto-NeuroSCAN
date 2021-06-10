import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import vars from './styles/constants';

const {
  fontFamily,
  primary,
  gutter,
} = vars;

const theme = createMuiTheme({
  typography: {
    fontFamily,
    h2: {
      fontSize: '1.125rem',
      fontWeight: '700',
    },
    h5: {
      fontSize: '0.75rem',
      fontWeight: '700',
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: '600',
    },
    body1: {
      fontSize: '0.75rem',
      color: 'rgba(0, 0, 0, 0.8)',
      lineHeight: '1.6',
    },
    caption: {
      fontSize: '0.75rem',
      color: 'rgba(0, 0, 0, 0.3)',
    },
    button: {
      textTransform: 'none',
      fontSize: '0.75rem',
      fontWeight: '600',
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#A41A45',
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
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
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
          '& .MuiTypography-h2': {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
    },
    MuiAccordion: {
      root: {
        boxShadow: 'none',
      },
    },
    MuiAccordionActions: {
      root: {},
    },
    MuiAccordionDetails: {
      root: {
        padding: '0',
        marginBottom: gutter,
      },
    },
    MuiAccordionSummary: {
      root: {
        '&.Mui-expanded': {
          minHeight: 'inherit',
        },
      },
      expandIcon: {
        color: 'rgba(0, 0, 0, 0.8)',
      },
    },
    MuiButton: {
      root: {
        fontFamily,
      },
      label: {
        fontFamily,
        fontSize: '0.75rem',
        fontWeight: '600',
      },
      containedPrimary: {
        backgroundColor: primary,
        '&:hover': {
          backgroundColor: primary,
        },
      },
    },
    MuiDrawer: {
      paper: {
        width: '240px',
        marginTop: `calc(${gutter} / 2 * 5) !important`,
        '& .MuiSvgIcon-root': {
          fontSize: '1rem',
        },
      },
      paperAnchorLeft: {
        '& .MuiBox-root': {
          '& .MuiSvgIcon-root': {
            flex: 'none',
            color: '#000',
            opacity: '0.8',
          },
          '& .MuiTypography-body1': {
            paddingLeft: gutter,
          },
        },
        '& .MuiBox-explore': {
          display: 'flex',
          paddingLeft: gutter,
          alignItems: 'center',
          justifyContent: 'space-between',
          '& .MuiIconButton-root': {
            paddingRight: gutter,
          },
        },
        '& .MuiBox-instance': {
          padding: gutter,
        },
        '& img': {
          width: '10px',
        },
      },
      paperAnchorRight: {
        '& .MuiBox-root': {
          display: 'flex',
          padding: gutter,
          '& .MuiSvgIcon-root': {
            flex: 'none',
            opacity: '0.8',
          },
          '& .MuiTypography-body1': {
            paddingLeft: gutter,
          },
        },
      },
    },
    MuiAppBar: {
      root: {
        zIndex: 1300,
        boxShadow: 'none',
      },
    },
    MuiToolbar: {
      root: {
        '& .MuiBox-root': {
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiBox-menu': {
          background: primary,
          width: '240px',
          paddingLeft: gutter,
          '& .MuiIconButton-root': {
            padding: '10px 12px',
            opacity: 0.8,
            '& .MuiSvgIcon-root': {
              fontSize: '1.3rem',
            },
          },
          '& .MuiTypography-h6': {
            color: 'rgba(255, 255, 255, 0.8)',
          },
        },
        '& .MuiBox-link': {
          margin: 'auto',
          '& .MuiLink-root': {
            color: 'rgba(255, 255, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            '& .MuiSvgIcon-root': {
              fontSize: '1rem',
            },
            '& .MuiTypography-button': {
              marginLeft: `calc(${gutter} / 2)`,
            },
            '& img': {
              opacity: 0.4,
            },
          },
        },
        '& .MuiBox-button': {
          marginRight: `calc(${gutter} / 4)`,
          '& .MuiLink-root': {
            background: '#222',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '6px',
            color: 'rgba(255, 255, 255, 0.8)',
            padding: '4px 8px',
            display: 'flex',
            marginRight: `calc(${gutter} / 4)`,
            '& img': {
              opacity: 0.8,
              marginLeft: `calc(${gutter} / 2)`,
            },
          },
        },
      },
      regular: {
        minHeight: `calc(${gutter} / 2 * 5) !important`,
      },
      gutters: {
        padding: '0 !important',
      },
    },
  },
});

export default theme;
