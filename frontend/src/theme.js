import createTheme from '@material-ui/core/styles/createTheme';
import vars from './styles/constants';

const {
  fontFamily,
  primaryColor,
  gutter,
  primaryBgColor,
  primaryTextColor,
  buttonOutlineColor,
  radius,
  headerBgColor,
  buttonOrange,
  whiteTextColor,
} = vars;

const theme = createTheme({
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
      letterSpacing: '0.005em',
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
      main: primaryColor,
      dark: headerBgColor,
    },
    secondary: {
      main: headerBgColor,
    },
    button: { main: buttonOrange },
    toolbarBackground: { main: 'rgb(255,0,0,0.5)' },
  },
  overrides: {
    MuiMenu: {
      paper: {
        minWidth: '10rem',
        background: buttonOutlineColor,
        border: '0.03125rem solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 .125rem .4375rem rgba(0, 0, 0, 0.15), 0 .3125rem 1.0625rem rgba(0, 0, 0, 0.2)',
        borderRadius: `calc(${radius} - .25rem)`,
      },
      list: {
        '& .MuiDivider-root': {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          marginTop: `calc(${gutter} / 2)`,
          marginBottom: `calc(${gutter} / 4)`,
        },
        '& .MuiMenuItem-root': {
          paddingTop: `calc(${gutter} / 4)`,
          paddingBottom: `calc(${gutter} / 4)`,
          lineHeight: 'normal',
          color: whiteTextColor,
          '& .MuiTypography-root': {
            flexGrow: 1,
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& .MuiSvgIcon-root': {
              fontSize: `calc(${gutter} - .125rem)`,
            },
          },
        },
      },
    },
    MuiCssBaseline: {
      '@global': {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        ' body': {
          backgroundColor: primaryBgColor,
        },
        '.MuiBox-content': {
          display: 'flex',
          alignItems: 'flex-start',
          flex: 1,
          minHeight: '100vh',
          padding: '3.75rem 1.5rem 1.5rem',
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
        backgroundColor: primaryColor,
        '&:hover': {
          backgroundColor: primaryColor,
        },
      },
    },
    MuiDrawer: {
      paper: {
        width: '15rem',
        marginTop: `calc(${gutter} / 2 * 5) !important`,
        '& .MuiSvgIcon-root': {
          fontSize: '1rem',
        },
      },
      paperAnchorLeft: {
        '& .MuiBox-root': {
          '& .MuiSvgIcon-root': {
            flex: 'none',
            color: headerBgColor,
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
          width: '0.625rem',
        },
      },
      paperAnchorRight: {
        '&.MuiDrawer-paperAnchorDockedRight': {
          borderLeft: 'none',
        },
        '& .MuiBox-root': {
          display: 'flex',
          padding: gutter,
          alignItems: 'flex-start',
          '&+ .MuiBox-root': {
            paddingTop: 0,
          },
          '& .MuiSvgIcon-root': {
            flex: 'none',
            opacity: '0.8',
          },
          '& img': {
            marginTop: '0.0625rem',
          },
          '& .MuiTypography-body1': {
            paddingLeft: gutter,
            lineHeight: gutter,
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
        alignItems: 'inherit',
        '& .MuiBox-root': {
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiBox-menu': {
          background: primaryColor,
          width: '15rem',
          paddingLeft: gutter,
          paddingRight: gutter,
          '& .MuiIconButton-root': {
            padding: '0.75rem',
          },
          '& .MuiTypography-h6': {
            color: primaryTextColor,
          },
        },
        '& .MuiBox-link': {
          flexGrow: 1,
          justifyContent: 'center',
          '& .MuiButton-root': {
            color: primaryTextColor,
            // paddingLeft: gutter,
            // paddingRight: gutter,
            '& img': {
              marginRight: `calc(${gutter} / 2)`,
            },
            '& .MuiButton-startIcon': {
              margin: 0,
            },
            '&:not(:last-child)': {
              marginRight: gutter,
            },
          },
        },
        '& .MuiBox-button': {
          paddingRight: `calc(${gutter} / 4)`,
          width: '15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          '& .MuiButton-contained': {
            width: '7.25rem',
            paddingLeft: 0,
            borderRadius: radius,
            paddingRight: 0,
          },
          '& .MuiButton-outlined': {
            background: buttonOutlineColor,
            border: '0.16rem solid rgba(255, 255, 255, 0.4)',
            borderRadius: radius,
            color: primaryTextColor,
            padding: `calc(${gutter} / 4) calc(${gutter} / 2)`,
            display: 'flex',
            marginRight: `calc(${gutter} / 4)`,
            '& img': {
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
