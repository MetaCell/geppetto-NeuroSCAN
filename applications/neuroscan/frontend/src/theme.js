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
  downloadBgColor,
  downloadBorderColor,
  buttonConfirmationColor,
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
    MuiFormGroup: {
      root: {
        flexDirection: 'row',
      },
    },
    MuiPopover: {
      root: {
        '&:not(.custom-popover)': {
          '& .MuiMenu-list .MuiMenuItem-root': {
            '&:before': {
              content: '""',
              width: '0.53125rem',
              height: '0.423076rem',
              border: `0.125rem solid ${whiteTextColor}`,
              borderTop: 'none',
              borderRight: 'none',
              transform: 'rotate(-45deg)',
              marginRight: '0.6875rem',
              opacity: '0',
            },
            '&.Mui-selected': {
              '&:before': {
                opacity: '1',
              },
            },
          },
        },
        '&.custom-popover': {
          '& .MuiPaper-root': {
            transform: 'translateY(0.75rem) translateX(-1.5rem) !important',
            '&::before': {
              content: '""',
              width: '0.875rem',
              height: '0.875rem',
              position: 'absolute',
              top: '-0.4375rem',
              left: '1.0625rem',
              background: whiteTextColor,
              transform: 'rotate(45deg)',
            },
          },
          '&.dark': {
            '&.right': {
              '& .MuiPaper-root': {
                transform: 'translateY(0.1875rem) translateX(0) !important',
                '&::before': {
                  left: 'auto',
                  right: '1.0625rem',
                },
              },
            },
            '&#addToViewerMenu': {
              '& .MuiPaper-root': {
                transform: 'translateY(1rem) translateX(0) !important',
              },
            },
            '&#explorer-menu-option': {
              '& .MuiPaper-root': {
                transform: 'translateY(0.5rem) translateX(0) !important',
              },
            },
            '&.no-pin': {
              '& .MuiPaper-root': {
                transform: 'none !important',
                '&::before': {
                  display: 'none',
                },
              },
            },
            '& .MuiPaper-root': {
              minWidth: '10rem',
              padding: '0.5rem 0',
              background: buttonOutlineColor,
              border: 'none',
              boxShadow: '0 .125rem .4375rem rgba(0, 0, 0, 0.15), 0 .3125rem 1.0625rem rgba(0, 0, 0, 0.2)',
              borderRadius: `calc(${radius} - .25rem)`,
              transform: 'translateY(0.1875rem) translateX(-1rem) !important',
              '&::before': {
                background: buttonOutlineColor,
              },

              '& .MuiList-root': {
                '& .MuiDivider-root': {
                  backgroundColor: dividerBackgroundColor,
                  marginTop: `calc(${gutter} / 2)`,
                  marginBottom: `calc(${gutter} / 2)`,
                },
                '& .MuiListItem-root': {
                  padding: '0.25rem 1rem',
                  position: 'relative',
                  '& ul': {
                    display: 'none',
                    position: 'absolute',
                    right: '-10rem',
                    top: '-0.5rem',
                    minWidth: '10rem',
                    padding: '0.5rem 0',
                    background: buttonOutlineColor,
                    border: 'none',
                    boxShadow: '0 .125rem .4375rem rgba(0, 0, 0, 0.15), 0 .3125rem 1.0625rem rgba(0, 0, 0, 0.2)',
                    borderRadius: `calc(${radius} - .25rem)`,
                  },

                  '&:hover > ul': {
                    display: 'block',
                  },
                  '&:hover': {
                    background: primaryColor,
                  },
                  '& .MuiListItemText-root': {
                    margin: '0',
                    '& p': {
                      fontSize: '0.75rem',
                      fontWeight: '400',
                      lineHeight: '1rem',
                      letterSpacing: '0.005em',
                      color: whiteTextColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    },
                    '& strong': {
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      lineHeight: '1rem',
                      letterSpacing: '0.005em',
                      color: whiteTextColor,
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
            },
          },
        },
      },
      paper: {
        background: whiteTextColor,
        boxShadow: '0 0.125rem 0.4375rem rgba(0, 0, 0, 0.15), 0 0.3125rem 1.0625rem rgba(0, 0, 0, 0.2)',
        borderRadius: '0.125rem',
        overflowX: 'visible',
        overflowY: 'visible',

        '& .color-picker': {
          '&--body': {
            display: 'flex',

            '& .list': {
              flexGrow: 1,
              borderRight: `0.0625rem solid ${modalBorderColor}`,
              '& .MuiList-root': {
                overflow: 'auto',
                maxHeight: '20.9375rem',
                '& .MuiDivider-root': {
                  backgroundColor: modalBorderColor,
                  marginTop: `calc(${gutter} / 2)`,
                  marginBottom: `calc(${gutter} / 4)`,
                },
                '& .MuiListItem-root': {
                  padding: '0',
                  '&.Mui-selected': {
                    background: treeItemActiveColor,
                  },
                  '& .MuiListItemText-root': {
                    margin: '0',
                    '& .MuiTypography-root': {
                      fontSize: '0.75rem',
                      lineHeight: '1rem',
                      letterSpacing: '0.005em',
                      color: lightBlackColor,
                      display: 'flex',
                      alignItems: 'center',
                      height: '2rem',
                      padding: '0 1rem',
                      cursor: 'pointer',
                      '& img': {
                        marginRight: '0.5rem',
                      },
                    },
                  },
                },
              },
            },
            '& .picker': {
              padding: '0.5rem',
              width: '13.0625rem',
              '&.inactive': {
                '& .chrome-picker ': {
                  opacity: '0.3',
                  pointerEvents: 'none',
                },
              },
              '& .chrome-picker ': {
                boxShadow: 'none !important',
                maxWidth: '100%',
                '& > div:first-child': {
                  paddingBottom: '13.9375rem !important',
                },
                '& > div:last-child': {
                  padding: '0.5rem 0 0 !important',
                },
              },
            },
          },
          '&--header': {
            minWidth: '26.0625rem',
            fontWeight: '500',
            fontSize: '0.75rem',
            lineHeight: '1rem',
            letterSpacing: '0.005em',
            color: lightBlackColor,
            padding: '0.75rem 0.5rem',
            boxShadow: `0 0.0625rem 0 ${modalBorderColor}`,
          },
        },

        '& .development-stage': {
          padding: '1rem',
          minWidth: '15rem',
          '& h3': {
            fontWeight: 'bold',
            fontSize: '0.75rem',
            lineHeight: '1rem',
            letterSpacing: '0.005em',
            color: lightBlackColor,
          },
        },

        '& .layers': {
          padding: '0.5rem 0',
          minWidth: '8.125rem',
          '& h3': {
            fontWeight: '500',
            fontSize: '0.75rem',
            lineHeight: '1rem',
            letterSpacing: '0.005em',
            color: lightBlackColor,
            padding: '0 0.5rem 0.25rem',
          },
          '& .MuiListItem-root': {
            padding: '0.1875rem 0.375rem',

            '& .MuiTypography-root': {
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.75rem',
              lineHeight: '1rem',
              letterSpacing: '0.005em',
              color: captionTextColor,
              position: 'relative',
              userSelect: 'none',
              paddingLeft: '0.5rem',
            },

            '& .MuiFormControlLabel-root': {
              margin: '0',
            },

            '& .MuiListItemIcon-root': {
              minWidth: '0.0625rem',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: '0.375rem',
            },

            '& .MuiIconButton-root': {
              padding: '0',
              margin: '0',
              '&:not(.Mui-checked)': {
                opacity: '0',
              },

              '&.Mui-checked': {
                '& + .MuiTypography-root': {
                  color: lightBlackColor,
                },
              },

            },
          },
        },

        '& .download': {
          minWidth: '16.25rem',
          '&-body': {
            padding: '1rem',
            '& .MuiList-root': {
              display: 'flex',
              justifyContent: 'space-between',
              '& .MuiListItem-root': {
                width: 'calc(50% - 0.25rem)',
                padding: '0',
                position: 'relative',
                '& .MuiIconButton-root': {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                  '&.Mui-checked + .MuiListItemText-root': {
                    borderColor: primaryColor,
                    borderWidth: '0.125rem',
                    '& p': {
                      color: primaryColor,
                    },
                  },
                },
                '& .MuiListItemText-root': {
                  background: downloadBgColor,
                  border: `0.0625rem solid ${captionTextColor}`,
                  borderRadius: '0.25rem',
                  height: '5.6875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  margin: '0',
                  '& img': {
                    display: 'block',
                    margin: '0 auto 0.5rem',
                    '&.tick': {
                      position: 'absolute',
                      right: '0.25rem',
                      top: '0.25rem',
                    },
                  },
                  '& p': {
                    letterSpacing: '0.005em',
                    fontSize: '0.75rem',
                    lineHeight: '1rem',
                    color: captionTextColor,
                  },
                },
              },
            },
          },
          '&-footer': {
            borderTop: `0.0625rem solid ${downloadBorderColor}`,
            padding: '0.5rem 1rem',
            '& .MuiButton-root': {
              width: '100%',
            },
          },
        },
      },
    },
    WAMuiChipInput: {
      chipContainer: {
        marginBottom: 0,
        minHeight: '0.0625rem',
      },
      inputRoot: {
        padding: '0.1875rem 1.9375rem !important',
      },
      input: {
        height: 'auto !important',
        margin: '0 !important',
        padding: '0 !important',
      },

      chip: {
        background: inputShadow,
        borderRadius: '3.125rem',
        padding: '0 0.25rem 0 0.375rem',
        margin: '0.1875rem 0',
        '&:hover': {
          background: inputShadow,
        },
        '& .MuiChip-label': {
          color: lightBlackColor,
          fontSize: '0.75rem',
          lineHeight: '1rem',
          fontWeight: 'normal',
          letterSpacing: '0.005em',
        },
        '& .MuiChip-deleteIcon': {
          margin: '0 0 0 0.125rem',
          color: `${primaryColor} !important`,
          width: '0.75rem',
          height: '0.75rem',
        },
      },
    },
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
          '&.Mui-selected': {
            backgroundColor: primaryColor,
            position: 'relative',
          },
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
          paddingBottom: '4.1875rem',
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
          },
        },
        '#delevlopment-stage-menu': {

          '& .MuiSlider-markLabel': {
            top: 'auto !important',
            bottom: '1.25rem',
            '&.MuiSlider-markLabelActive': {
              '& span': {
                borderColor: primaryColor,
              },
            },
          },
          '& .MuiPopover-paper': {
            padding: '3.75rem 1.375rem 1rem',
            transform: 'translateX(1.25rem) translateY(1.75rem) !important',
            width: '90%',
          },
        },
        '.filter-box': {
          '& .MuiAutocomplete-clearIndicator': {
            color: whiteTextColor,
          },

          '& .MuiFilledInput-root': {
            paddingTop: '1.1875rem !important',
            paddingLeft: '0.5rem !important',
          },

          '& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"]': {
            paddingRight: '2.1875rem',
          },

          '& .MuiAutocomplete-tag': {
            fontWeight: '600',
            fontSize: '0.75rem',
            lineHeight: '1rem',
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            color: whiteTextColor,
          },

          '& .MuiChip-root': {
            background: primaryColor,
            borderRadius: '0.75rem',
            margin: '0.1875rem 0.125rem',
            padding: '0 0.5rem !important',
            '& .MuiChip-deleteIcon': {
              color: whiteTextColor,
              margin: '0 0 0 0.25rem',
            },
            '& .MuiChip-label': {
              fontWeight: '600',
              fontSize: '0.75rem',
              lineHeight: '1rem',
              letterSpacing: '0.005em',
              textTransform: 'uppercase',
              color: whiteTextColor,
            },
          },
          '& .filters': {
            // minHeight: '5rem',
            background: filtersBgColor,
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '4rem',
            boxShadow: `0 .25rem 3.125rem -1.0625rem ${filterShadowColor}`,
            borderRadius: '0.5rem',
            padding: '0.75rem 0',
            marginTop: '-2.5rem !important',
            '& .MuiFormLabel-root': {
              color: paragraphColor,
              fontWeight: '600',
              top: '0 !important',
              '&.Mui-focused + .MuiFilledInput-root': {
                flexWrap: 'wrap',
                background: borderColor,
              },

              '&.Mui-focused + div .MuiFilledInput-root': {
                flexWrap: 'wrap',
                background: borderColor,
              },
              '&.Mui-focused + div .MuiFilledInput-root .chipAdornment .development-icon': {
                transform: 'rotate(180deg)',
              },
            },
            '& .chipAdornment': {
              position: 'absolute',
              right: '0.5625rem',
              top: 'calc(50% - 0.875rem)',
              height: 'auto',
              margin: '0',
              '& .development-icon': {
                padding: '0.125rem',
                marginRight: '-0.125rem',
              },
            },
            '& .MuiInputBase-input': {
              color: whiteTextColor,
              textOverflow: 'ellipsis',
              padding: '0.5625rem 0.25rem !important',
            },
            '& .MuiFilledInput-root': {
              background: 'transparent',
              borderRadius: '0.3125rem',
              // flexWrap: 'nowrap',
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
              '& .MuiAutocomplete-fullWidth': {
                maxWidth: '100%',
              },
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
                // padding: '0 0.75rem',
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

        '.MuiAutocomplete-popper': {
          '& .MuiAutocomplete-paper': {
            '& .MuiAutocomplete-listbox': {
              padding: '0.625rem 0',
            },
            '& .MuiAutocomplete-option': {
              padding: '0.4375rem 1rem',
              fontSize: '0.75rem',
              lineHeight: '1.25rem',
              letterSpacing: '0.16px',
              color: 'rgba(0, 0, 0, 0.8)',
              background: 'transparent',
              '& .MuiCheckbox-root': {
                padding: '0',
                '&:not(.Mui-checked)': {
                  color: 'rgba(0, 0, 0, 0.8)',
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
              '&.small': {
                maxWidth: '20rem',
                '& .modal-body': {
                  minHeight: '0.0625rem',
                },
              },
              '&.medium': {
                maxWidth: '29.8125rem',
                '& .modal-body': {
                  minHeight: '0.0625rem',
                },
              },
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
              '& .video-box': {
                position: 'relative',
                border: `0.625rem solid ${buttonOutlineColor}`,
                overflow: 'hidden',
                borderRadius: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '22.375rem',
                '& img': {
                  maxWidth: '100%',
                  display: 'block',
                },
                '& .play-icon': {
                  cursor: 'pointer',
                },
              },
              '& .MuiFormLabel-root': {
                fontWeight: 'bold',
                fontSize: '0.75rem',
                lineHeight: '1rem',
                letterSpacing: '0.005em',
                color: lightBlackColor,
                marginBottom: '0.3125rem',
                display: 'block',
              },
              '& p': {
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                color: modalTextColor,
                letterSpacing: '0.01rem',
                '& + p': {
                  marginTop: '0.3125rem',
                },
              },
              '& .neurons-position': {
                marginTop: '1rem',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  '&:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                    borderColor: modalBorderColor,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '0',
                  minWidth: '6.375rem',
                  minHeight: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '.5rem',
                  paddingRight: '2rem',
                },

                '& .MuiSelect-icon': {
                  background: modalBorderColor,
                  width: '1.5rem',
                  height: '1.875rem',
                  top: '0.0625rem',
                  right: '0.0625rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderRadius: '0 0.1875rem 0.1875rem 0',
                },
                '& h3': {
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  lineHeight: '1rem',
                  letterSpacing: '0.005em',
                  color: 'rgba(0, 0, 0, 0.8)',
                  '& ~ .MuiBox-root': {
                    marginTop: '0.75rem',
                  },
                },
                '& p': {
                  fontSize: '0.75rem',
                  lineHeight: '1.25rem',
                  letterSpacing: '0.16px',
                  color: 'rgba(0, 0, 0, 0.8)',
                },
              },
            },
            '&-footer': {
              borderTop: `0.0625rem solid ${modalBorderColor}`,
              padding: '0 1rem',
              height: '4.125rem',
              display: 'flex',
              alignItems: 'center',
              '& button': {
                '& img': {
                  marginRight: '0.5rem',
                },
                '& + button': {
                  marginLeft: '1rem',
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
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
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
      containedSecondary: {
        backgroundColor: buttonConfirmationColor,
        '&:hover': {
          backgroundColor: buttonConfirmationColor,
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
          '& .search-bar': {
            '& + .MuiBox-root': {
              height: '2rem',
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.5625rem',
            },
          },
          '& .MuiFormControl-root': {
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
                      marginLeft: '0.5rem',
                      transition,
                    },
                    '& > img': {
                      transform: 'rotate(-90deg)',
                      transition,
                      marginRight: '.5rem',
                    },
                  },
                  '& .labelIcon': {
                    margin: '0 .5rem 0 0',
                    flexShrink: 0,
                  },
                  '& .MuiIconButton-edgeStart': {
                    marginLeft: 0,
                  },
                  '& .labelText': {
                    fontWeight: '500',
                    flexGrow: 1,
                    fontSize: '0.75rem',
                    lineHeight: '1rem',
                    color: lightBlackColor,
                    letterSpacing: '0.005em',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
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
        // '& img': {
        //   width: '0.625rem',
        // },
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
