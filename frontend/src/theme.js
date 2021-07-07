import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
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
  subHeaderHeadingColor,
  subHeaderBg,
  filtersBgColor,
  dividerBackgroundColor,
  borderColor,
  paragraphColor,
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
          backgroundColor: dividerBackgroundColor,
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
            color: whiteTextColor,
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
        '::-webkit-scrollbar': {
          width: '.25rem',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'rgba(0,0,0,0.24)',
          borderRadius: '.25rem',
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
            color: dividerBackgroundColor,
          },
        },
        '.wrapper': {
          maxWidth: 'calc(100% - (17.7rem * 2))',
          margin: '0 auto',
        },
        '.main-content': {
          paddingTop: '2.625rem',
          '& .button-group': {
            padding: '4.25rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& .MuiButton-outlined': {
              borderColor,
            },
            '& .MuiButton-root': {
              height: '3.5rem',
              width: '9.375rem',
              borderRadius: '0.5rem',
              color: whiteTextColor,
              '&+ .MuiButton-root': {
                marginLeft: '3rem',
                position: 'relative',
                '&::before': {
                  content: '""',
                  width: '0.0625rem',
                  height: '3.5rem',
                  background: borderColor,
                  position: 'absolute',
                  left: '-1.5rem',
                  top: '0',
                },
              },
              '& .MuiButton-label': {
                fontSize: '0.875rem',
                fontWeight: 'bold',
                letterSpacing: '0.005em',
                color: whiteTextColor,
              },
            },
          },
          '& .available-results': {
            fontWeight: '600',
            fontSize: '0.75rem',
            lineHeight: '1rem',
            letterSpacing: '0.005em',
            color: paragraphColor,
            marginBottom: '2rem',
          },
          '& .results-wrap': {
            borderBottom: '0.0625rem solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '3.75rem',
          },
          '& .results-box': {
            background: borderColor,
            borderRadius: '0.5rem',
            height: '47.875rem',
            '&:not(:last-child)': {
              marginBottom: '3rem',
            },
          },
        },
        '.sub-header': {
          // height: '16.75rem',
          background: subHeaderBg,
          marginBottom: '4rem',
          transition: 'all ease-in .3s',
          paddingTop: '5.125rem',
          paddingBottom: '1.875rem',

          '& .wrapper': {
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            '& p': {
              fontWeight: '600',
              fontSize: '0.75rem',
              lineHeight: '1rem',
              letterSpacing: '0.005em',
              color: paragraphColor,
              marginBottom: '1.5rem',
              transition: 'all ease-in-out .3s',
            },

            '& h1': {
              fontWeight: 'bold',
              fontSize: '2.25rem',
              lineHeight: '2.9375rem',
              transition: 'all ease-in-out .3s',
              color: subHeaderHeadingColor,
              marginBottom: '1.8125rem',
            },

            '& .filters': {
              height: '5rem',
              background: filtersBgColor,
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 .25rem 3.125rem -1.0625rem rgba(0, 0, 0, 0.7)',
              borderRadius: '0.5rem',
              marginBottom: '-4.375rem',
              transition: 'all ease-in-out .3s',
              '& .MuiFormLabel-root': {
                color: paragraphColor,
                fontWeight: '600',
              },
              '& .MuiInputBase-input': {
                color: whiteTextColor,
              },
              '& .MuiFilledInput-root': {
                background: borderColor,
                borderRadius: '0.3125rem',
                '&::before': {
                  display: 'none',
                },
                '&::after': {
                  display: 'none',
                },
              },
              '& .MuiListItem-root': {
                width: 'calc((100% - 8.375rem) / 3)',
                padding: '0 0.75rem',
                position: 'relative',
                '&+ .MuiListItem-root': {
                  '&::before': {
                    content: '""',
                    background: borderColor,
                    width: '0.0625rem',
                    height: '3.1875rem',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                  },
                },
                '&:last-child': {
                  width: '8.375rem',
                },
              },
              '& .MuiButton-contained': {
                height: '3.1875rem',
                width: '100%',
                '& .MuiButton-label': {
                  fontSize: '0.875rem',
                },
              },
            },
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
        width: '17.7rem',
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
          width: '17.7rem',
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
          width: '17.7rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginLeft: 'auto',
          '& .MuiButton-contained': {
            width: '7.25rem',
            paddingLeft: 0,
            minHeight: '2.125rem',
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
