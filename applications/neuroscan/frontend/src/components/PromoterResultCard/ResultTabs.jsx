import React from 'react';
import {
  Box, Tabs, Tab,
} from '@material-ui/core';
import TIMELINE from '../../images/timeline.svg';
import { PROMOTER_MEDIA_TYPES } from '../../utilities/constants';
import VideoPlayer from '../VideoPlayer';

function a11yProps(value) {
  return {
    id: `simple-tab-${value}`,
    'aria-controls': value,
  };
}

const renderTab = (option, fullWidth, whiteBg) => {
  const { mediaType } = option;
  switch (mediaType) {
    case PROMOTER_MEDIA_TYPES.video:
      return (
        <VideoPlayer src={option?.src} />
      );
    default:
      return (fullWidth ? (
        <Box p={2} className={whiteBg ? 'model-box' : ''}>
          <img src={option?.src || TIMELINE} alt={option?.label} />
        </Box>

      ) : (
        <Box p={2} className={whiteBg ? 'model-box' : ''}>
          <img
            src={option?.src}
            alt={option?.label}
            style={{ visibility: option?.src ? 'visible' : 'hidden' }}
          />
        </Box>
      ));
  }
};

const ResultTabs = ({
  options, fullWidth = false, whiteBg = false,
}) => {
  const [selected, setSelected] = React.useState(options[0]?.label);

  const handleChange = (event, newValue) => {
    setSelected(newValue);
  };

  const TabPanel = (props) => {
    const {
      children,
      value,
      index,
      ...other
    } = props;
    return (
      <div
        role="tabpanel"
        className="tab-wrap"
        hidden={selected !== index}
        id={value}
        aria-labelledby={`simple-tab-${value}`}
        {...other}
      >
        {selected === index && (
          <Box className="tab-content">
            {children}
          </Box>
        )}
      </div>
    );
  };

  return (
    <Box className={fullWidth ? 'custom-tabs single' : 'custom-tabs'} key={options[0]?.label}>
      <Tabs value={selected} onChange={handleChange}>
        {
            options.map((option) => (
              <Tab
                value={option?.label}
                key={option?.label}
                label={option?.label}
                {...a11yProps(option?.label)}
              />
            ))
          }
      </Tabs>
      {
          options.map((option, index) => (
            <TabPanel
              value={option?.label}
              index={option?.label}
              key={`${option?.label}${index}`}
            >
              {renderTab(option, fullWidth, whiteBg)}
            </TabPanel>
          ))
        }
    </Box>
  );
};

export default ResultTabs;
