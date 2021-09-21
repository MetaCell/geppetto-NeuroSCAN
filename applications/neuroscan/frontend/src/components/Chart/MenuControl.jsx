import React, { useState, useEffect } from 'react';
import {
  Popover,
} from '@material-ui/core';
import { VIEWER_MENU } from '../../utilities/constants';
import LayersMenu from './ControlMenus/LayersMenu';
import DevStageMenu from './ControlMenus/DevStageMenu';
import DownloadMenu from './ControlMenus/DownloadMenu';

const MenuControl = ({
  anchorEl, handleClose, open, id, selection,
}) => {
  const [content, setContent] = useState(null);
  const [developmentalStage, setDevelopmentalStage] = useState(0);
  const layersList = ['Worm Body', 'Pharynx', 'NerveRing'];
  const downloadFiles = (option) => {
    console.log(`selected option: ${option}`);
    handleClose();
  };

  useEffect(() => {
    switch (selection) {
      case VIEWER_MENU.devStage: setContent(
        <DevStageMenu
          setDevelopmentalStage={setDevelopmentalStage}
          developmentalStage={developmentalStage}
        />,
      );
        break;
      case VIEWER_MENU.layers: setContent(<LayersMenu layers={layersList} />);
        break;
      case VIEWER_MENU.download: setContent(<DownloadMenu downloadFiles={downloadFiles} />);
        break;
      default:
        setContent(null);
    }
  }, [selection]);

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      { content }
    </Popover>
  );
};

export default MenuControl;
