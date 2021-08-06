import React from 'react';
import {
  Box, Tabs, Tab,
} from '@material-ui/core';

function a11yProps(value) {
  return {
    id: `simple-tab-${value}`,
    'aria-controls': value,
  };
}

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
    <Box className="custom-tabs" key={options[0]?.label}>
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
            {
              fullWidth ? (
                <img src={option?.src} alt={option?.label} />
              ) : (
                <Box p={2} className={whiteBg ? 'model-box' : ''}>
                  <img
                    src={option?.src}
                    alt={option?.label}
                    style={{ visibility: option?.src ? 'visible' : 'hidden' }}
                  />
                </Box>
              )
            }
          </TabPanel>
        ))
      }
    </Box>
  );
};

export default ResultTabs;
