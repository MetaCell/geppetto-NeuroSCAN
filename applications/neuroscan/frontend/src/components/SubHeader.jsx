import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import {
  VIEWS,
  MAIL_TO,
  MAIL_SUBJECT,
  MAIL_BODY,
} from '../utilities/constants';
import IconSuggest from '../images/icon-suggest.svg';
import IconCopy from '../images/icon-copy.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      '& .MuiBox-button': {
        width: '100% !important',
        justifyContent: 'center !important',
        padding: '.5rem 1rem !important',
        '& .MuiButton-outlined': {
          marginRight: '.5rem !important',
        },
        '& button': {
          flexGrow: '1 !important',
        },
      },
    },
  },
}));

const sendMail = () => {
  const link = `mailto:${MAIL_TO}
?subject=${encodeURIComponent(MAIL_SUBJECT)}
&body=${encodeURIComponent(MAIL_BODY)}`;

  window.location.href = link;
};

const SubHeader = (props) => {
  const { view } = props;
  const classes = useStyles();
  return (
    <Box className={`${classes.root} section-header`}>
      <Box className="MuiBox-button">
        {view?.title === VIEWS.promoterDB.title ? (
          <>
            <Button
              variant="outlined"
              startIcon={<img src={IconSuggest} alt="Suggest" />}
              onClick={sendMail}
            >
              Suggest a Promoter
            </Button>
            <Button color="primary" variant="contained">
              Contact Us
            </Button>
          </>
        ) : (
          <>
            <Button variant="outlined" endIcon={<img src={IconCopy} alt="Copy" />}>
              Copy Link
            </Button>
            <Button color="primary" variant="contained">
              Share on Twitter
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SubHeader;
