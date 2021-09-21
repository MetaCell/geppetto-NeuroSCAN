import React, { useState, useEffect } from 'react';
import {
  Popover,
} from '@material-ui/core';
import { VIEWER_MENU } from '../../utilities/constants';
import LayersMenu from './ControlMenus/LayersMenu';
import DevStageMenu from './ControlMenus/DevStageMenu';
import DownloadMenu from './ControlMenus/DownloadMenu';
import ColorPickerMenu from './ControlMenus/ColorPickerMenu';

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
  const groups = ['Group ABC', 'Group XYZ'];
  const neurons = ['Neuron A', 'Neuron X'];
  const contacts = ['Contact A', 'Contact X'];
  const synapses = ['Synapse C', 'Synapse X', 'Synapse A', 'Synapse B'];
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
      case VIEWER_MENU.colorPicker:
        setContent(
          <ColorPickerMenu
            groups={groups}
            neurons={neurons}
            contacts={contacts}
            synapses={synapses}
          />,
        );
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
