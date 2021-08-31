import { createTheme } from '@material-ui/core/styles';
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
  transition,
  modalTextColor,
  modalBorderColor,
  lightBlackColor,
  captionTextColor,
  toolbarBackground,
  filterShadowColor,
  scrollBarBg,
  outlinedBorderColor,
  listHoverBg,
  inputShadow,
  treeItemActiveColor,
  blackColor,
  tabBackgroundColor,
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
      color: lightBlackColor,
      lineHeight: '1.6',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      color: captionTextColor,
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
    toolbarBackground: { main: toolbarBackground },
  },
  overrides: {
    MuiTab: {
      root: {
        padding: '0.6875rem .5rem',
        minWidth: '0.0625rem !important',
        minHeight: 'auto',
        fontWeight: '500',
      },
      textColorInherit: {
        opacity: '0.4',
        '&.Mui-selected': {
          background: blackColor,
          borderRadius: '0.3125rem 0.3125rem 0 0',
        },
      },
      wrapper: {
        fontSize: '0.75rem',
        lineHeight: '1rem',
        letterSpacing: '0.005em',
        color: whiteTextColor,
      },
    },
    MuiTabs: {
      root: {
        minHeight: '2.375rem',
        height: '2.375rem',
        '& .MuiTabs-indicator': {
          display: 'none',
        },
      },
    },
    MuiChip: {
      root: {
        backgroundColor: borderColor,
        height: '1.5rem',
        padding: '0 0.5rem',
        '&.active': {
          backgroundColor: dividerBackgroundColor,
          '& .MuiChip-label': {
            color: primaryTextColor,
          },
        },
        '&:not(:last-child)': {
          marginRight: '0.5rem',
        },

        '& .MuiChip-avatar': {
          width: '1rem',
          height: '1rem',
          margin: '0 0.25rem 0 -0.25rem',
        },
      },

      label: {
        paddingLeft: 0,
        paddingRight: 0,
        color: dividerBackgroundColor,
        fontSize: '0.75rem',
        lineHeight: '1rem',
        fontWeight: '600',
        letterSpacing: '0.005em',
      },
    },
    MuiOutlinedInput: {},
    MuiSlider: {
      root: {
        margin: '0',
        padding: '0.6875rem 0 !important',
        width: '100%',
      },
      thumb: {
        width: '0.625rem',
        height: '0.625rem',
        border: `0.0625rem solid ${whiteTextColor}`,
        marginLeft: '-0.3125rem',
        '&:after': {
          display: 'none',
        },
      },
      mark: {
        height: '0.0625rem',
        backgroundColor: lightBlackColor,
        width: '0.0625rem',
        borderRadius: 0,
      },
      rail: {
        height: '0.0625rem',
        backgroundColor: lightBlackColor,
        opacity: '1',
        borderRadius: 0,
      },
      markActive: {
        backgroundColor: headerBgColor,
      },
      track: {
        height: '0.0625rem',
        backgroundColor: lightBlackColor,
        borderRadius: 0,
        opacity: '1',
      },
      markLabel: {
        top: '0 !important',
        fontSize: 0,
        '& img': {
          width: '.375rem',
        },
      },
      marked: {
        marginBottom: '0',
      },
      valueLabel: {
        left: 'calc(-50% - 0.4375rem)',
        top: '-0.6875rem',
        '&>span': {
          height: '0.875rem',
          borderRadius: '0.0625rem',
          transform: 'none',
          backgroundColor: captionTextColor,
          padding: '0',
          width: '1.9375rem',
          '&>span': {
            transform: 'none',
            fontWeight: '500',
            fontSize: '0.625rem',
            lineHeight: '0.625rem',
          },
        },
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiMenu: {
      paper: {
        minWidth: '10rem',
        background: buttonOutlineColor,
        border: 'none',
        boxShadow: '0 .125rem .4375rem rgba(0, 0, 0, 0.15), 0 .3125rem 1.0625rem rgba(0, 0, 0, 0.2)',
        borderRadius: `calc(${radius} - .25rem)`,
      },
      list: {
        '& > .MuiTypography-root': {
          fontSize: '0.75rem',
          fontWeight: '500',
          lineHeight: '1rem',
          letterSpacing: '0.005em',
          color: whiteTextColor,
          padding: '0.25rem 1rem',
        },
        '& .MuiDivider-root': {
          backgroundColor: dividerBackgroundColor,
          marginTop: `calc(${gutter} / 2)`,
          marginBottom: `calc(${gutter} / 4)`,
        },
        '& .MuiMenuItem-root': {
          paddingTop: `calc(${gutter} / 4)`,
          paddingBottom: `calc(${gutter} / 4)`,
          lineHeight: 'normal',
          minHeight: 1,
          color: whiteTextColor,
          '&:hover': {
            backgroundColor: primaryColor,
          },
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
          background: scrollBarBg,
          borderRadius: '.25rem',
        },
        '.ml-auto': {
          marginLeft: 'auto !important',
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
          height: 'calc(100% - 2.5rem)',
          '& .MuiTypography-h2': {
            color: dividerBackgroundColor,
          },
        },
        '.wrapper': {
          maxWidth: 'calc(100% - (17.7rem * 2))',
          margin: '0 auto',
        },
        '.main-content': {
          height: 'calc(100vh - (20.75rem))',
          overflow: 'auto',
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
            background: primaryBgColor,
            paddingTop: '2.625rem',
            paddingBottom: '2rem',
            position: 'sticky',
            top: 0,
            zIndex: 2,
          },
          '& .results-wrap': {
            borderBottom: `0.0625rem solid ${borderColor}`,
            paddingBottom: '3.75rem',
          },
          '& .results-box': {
            background: borderColor,
            borderRadius: '0.5rem',
            padding: '1.25rem',
            '& .custom-tabs': {
              paddingBottom: '1.5rem',
              height: '100%',
              '&.single': {
                '& .tab-content > div': {
                  paddingTop: '0',
                  '& img': {
                    position: 'static',
                  },
                },
              },
              '& .tab-wrap': {
                height: 'calc(100% - (2.375rem))',
              },
            },

            '& .tab-content': {
              overflow: 'hidden',
              height: '100%',
              '& > div': {
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                background: blackColor,
                borderRadius: '0 0.3125rem 0.3125rem 0.3125rem',
                paddingTop: '75%',
                position: 'relative',
                '&.model-box': {
                  background: tabBackgroundColor,
                },
              },
              '& img': {
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
                margin: '0 auto',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              },
            },
            '& .MuiAccordion-rounded': {
              borderRadius: 0,
              backgroundColor: 'transparent',
              borderTop: `0.0625rem solid ${borderColor}`,
              borderBottom: `0.0625rem solid ${borderColor}`,
              padding: '1rem 0 0.75rem',

              '& .MuiAccordionDetails-root': {
                '& p': {
                  fontSize: '1rem',
                  lineHeight: '1.3125rem',
                  letterSpacing: '0.005em',
                  color: dividerBackgroundColor,
                },
              },
              '& .MuiAccordionSummary-root': {
                minHeight: '0.0625rem',
                paddingBottom: '0.25rem',
                '& .MuiAccordionSummary-expandIcon': {
                  margin: 0,
                  '&.Mui-expanded': {
                    transform: 'rotate(-180deg)',
                  },
                },
                '& .MuiAccordionSummary-content': {
                  order: 1,
                  '& p': {
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    lineHeight: '1rem',
                    color: paragraphColor,
                    letterSpacing: '0.005em',
                    marginBottom: 0,
                  },
                },
              },
            },
            '&_header': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              '& .wrap': {
                '& p': {
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  lineHeight: '0.875rem',
                  letterSpacing: '0.005em',
                  color: dividerBackgroundColor,
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '0.5625rem',
                  justifyContent: 'flex-end',
                  textTransform: 'uppercase',
                  marginBottom: 0,
                  '& img': {
                    width: '0.75rem',
                    height: '0.75rem',
                    marginRight: '0.3125rem',
                  },
                },
              },
              '& h3': {
                fontWeight: '600',
                fontSize: '2rem',
                lineHeight: '2rem',
                letterSpacing: '0.005em',
                color: subHeaderHeadingColor,
              },
            },
            '&:not(:last-child)': {
              marginBottom: '3rem',
            },
          },
        },
        '.sub-header': {
          height: 'calc(16.75rem - 2.5rem)',
          background: subHeaderBg,
          marginBottom: '4rem',
          transition: 'height ease-in .3s',

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
              transition,
            },

            '& h1': {
              fontWeight: 'bold',
              fontSize: '2.25rem',
              lineHeight: '2.9375rem',
              transition,
              color: subHeaderHeadingColor,
              marginBottom: '1.8125rem',
            },

            '& .filters': {
              height: '5rem',
              background: filtersBgColor,
              display: 'flex',
              alignItems: 'center',
              boxShadow: `0 .25rem 3.125rem -1.0625rem ${filterShadowColor}`,
              borderRadius: '0.5rem',
              marginBottom: '-2.5rem',
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
        '.primary-structure': {
          // paddingTop: '2.5rem',
          height: '100vh',
          '&.height-auto': {
            height: 'auto',
          },

          '& .section-header': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            background: headerBgColor,
            height: '2.5rem',

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
                border: `0.16rem solid ${outlinedBorderColor}`,
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

          '&_content': {
            flexGrow: 1,
            '&.padding': {
              padding: '0.5rem',
            },
            '& > div': {
              position: 'relative',
            },
          },
        },
        '.primary-modal': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          padding: '1rem',
          '& .modal': {
            '&-dialog': {
              margin: 'auto',
              backgroundColor: whiteTextColor,
              width: '100%',
              maxWidth: '43rem',
            },
            '&-header': {
              height: '3.625rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              borderBottom: `0.0625rem solid ${modalBorderColor}`,
              '& .MuiIconButton-root': {
                padding: 0,
              },
              '& p': {
                fontSize: '1.25rem',
                lineHeight: '1.625rem',
                color: modalTextColor,
              },
              '& img': {
                cursor: 'pointer',
              },
            },
            '&-body': {
              padding: '1rem',
              minHeight: '24.5rem',
              '& p': {
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                color: modalTextColor,
                letterSpacing: '0.01rem',
                '& + p': {
                  marginTop: '0.3125rem',
                },
              },
            },
            '&-footer': {
              borderTop: `0.0625rem solid ${modalBorderColor}`,
              padding: '0 1rem',
              height: '4.125rem',
              display: 'flex',
              alignItems: 'center',
              '& button + button': {
                marginLeft: '1rem',
              },
            },
          },
        },
      },
    },
    MuiAccordion: {
      root: {
        boxShadow: 'none',
        margin: '0',
        '&.Mui-expanded': {
          margin: '0',
        },
        '&::before': {
          display: 'none',
        },
      },
    },
    MuiAccordionActions: {
      root: {},
    },
    MuiAccordionDetails: {
      root: {
        padding: '0',
        marginBottom: 0,
        flexDirection: 'column',
        '& .MuiList-root': {
          width: '100%',
          padding: '0',
          overflow: 'auto',
          maxHeight: '14rem',
          '& + button': {
            width: 'calc(100% - 2rem)',
            margin: '0.5625rem auto',
          },
          '& .MuiListItem-root': {
            padding: '0 1rem 0 2.0625rem',
            height: '2rem',
            '& .MuiButton-root': {
              height: '1.5rem',
              borderRadius: '.375rem',
              minWidth: '3.375rem',
              padding: '0',
              display: 'none',
            },
            '&:hover': {
              background: listHoverBg,
              '& .MuiButton-root': {
                display: 'block',
              },
            },
            '& .MuiListItemIcon-root': {
              minWidth: '0.0625rem',
              marginRight: '0.5rem',
            },
            '& .MuiListItemText-root': {
              margin: '0',
              '& span': {
                letterSpacing: '0.005em',
              },
            },
          },
        },
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: '0',
        minHeight: '2rem',
        '&.Mui-expanded': {
          minHeight: '2rem',
        },
      },
      content: {
        minHeight: '0.0625rem',
        order: 2,
        margin: '0',
        '&.Mui-expanded': {
          margin: '0',
        },

        '& h5': {
          fontWeight: '500',
          letterSpacing: '0.005em',
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        },
      },
      expandIcon: {
        color: lightBlackColor,
        order: 1,
        margin: '0 0.5rem 0 0',
        padding: '0',
        '&.Mui-expanded': {
          transform: 'rotate(90deg)',
        },
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
      root: {
        height: 'calc(100vh - 2.5rem)',
        '&.shrink': {
          '& .MuiTypography-root': {
            fontWeight: '600',
            fontSize: '0.875rem',
            color: primaryColor,
            transform: 'rotate(-90deg)',
            letterSpacing: '0.005em',
            lineHeight: '1rem',
          },
          '& .MuiDrawer-paper': {
            width: '2.5rem',
            paddingTop: '4.375rem',
            transition,
          },
        },

        '& .wrap': {
          padding: '0 1rem ',
          '& .MuiAccordion-root': {
            margin: '0 -1rem',
            '&:last-child': {
              marginBottom: '0',
            },
          },
          '& .MuiAccordionSummary-root': {
            padding: '0 1rem',
          },
          '& .MuiFormControl-root': {
            '& + .MuiBox-root': {
              height: '2rem',
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.5625rem',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              boxShadow: `0 0 0 0.125rem ${inputShadow}`,
            },
            '& .MuiOutlinedInput-input': {
              paddingTop: '0',
              paddingBottom: '0',
            },
            '& .MuiOutlinedInput-root': {
              height: '2rem',
              borderRadius: '0.125rem',
            },
            '& .MuiOutlinedInput-adornedStart': {
              paddingLeft: '0.5rem',
            },
            '& .MuiOutlinedInput-adornedEnd': {
              paddingRight: '0.5rem',
            },
            '& .MuiIconButton-root': {
              padding: '0',
            },
          },
          '&.instances-box': {
            padding: '0',
            '& > .MuiTreeView-root': {
              '& .MuiTreeItem-label': {
                paddingLeft: 0,
              },
              '& .MuiTreeItem-iconContainer': {
                display: 'none',
              },
            },

            '& .MuiTreeView-root': {
              '& img': {
                width: 'auto',
                display: 'block',
              },
              '& .MuiCollapse-root': {
                '& .labelText': {
                  fontWeight: 'normal !important',
                },
              },
              '& .MuiTreeItem-root': {
                position: 'relative',
                '&.Mui-expanded': {
                  '&> .MuiTreeItem-content': {
                    '&> .MuiTreeItem-label': {
                      '&> .labelRoot': {
                        '& img': {
                          transform: 'rotate(0deg)',
                          transition,
                        },
                      },
                    },
                  },
                },
                '& > .MuiTreeItem-content .MuiTreeItem-label': {
                  background: 'transparent',
                },
                '&.Mui-selected': {
                  '& > .MuiTreeItem-content .MuiTreeItem-label': {
                    background: `${treeItemActiveColor} !important`,
                  },
                },
                '& .MuiTreeItem-group': {
                  // paddingLeft: '0',
                  // margin: 0,
                },
                '& .MuiTreeItem-content': {
                  position: 'relative',
                  zIndex: 1,
                  '& .labelRoot': {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5625rem 0.6875rem',
                    '&:hover': {
                      '& .MuiIconButton-root': {
                        display: 'block',
                        transition,
                      },
                    },
                    '& .MuiIconButton-root': {
                      padding: 0,
                      display: 'none',
                      transition,
                    },
                    '& > img': {
                      transform: 'rotate(-90deg)',
                      transition,
                    },
                  },
                  '& .labelIcon': {
                    margin: '0 .5rem',
                    flexShrink: 0,
                  },
                  '& .labelText': {
                    fontWeight: '500',
                    flexGrow: 1,
                    fontSize: '0.75rem',
                    lineHeight: '1rem',
                    color: lightBlackColor,
                    letterSpacing: '0.005em',
                  },
                },
              },
            },
          },
          '& + .wrap': {
            borderTop: `0.0625rem solid ${modalBorderColor}`,
          },
          '& > h5': {
            display: 'flex',
            alignItems: 'center',
            height: '2.5rem',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '0.75rem',
            lineHeight: '1rem',
            '& img': {
              marginRight: '0.625rem',
            },
          },
          '& h3': {
            fontWeight: 'bold',
            fontSize: '0.75rem',
            lineHeight: '1rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        },
      },
      paper: {
        width: '17.7rem',
        transition,
        borderRight: 'none !important',
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

      positionFixed: {
        position: 'static',
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
          height: '2.5rem',
          paddingLeft: gutter,
          paddingRight: '0.25rem',
          transition,
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
