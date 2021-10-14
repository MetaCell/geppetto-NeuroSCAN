/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Popover,
} from '@material-ui/core';
import {
  CONTACT_TYPE,
  NEURON_TYPE,
  SYNAPSE_TYPE,
  VIEWER_MENU,
} from '../../utilities/constants';
import LayersMenu from './ControlMenus/LayersMenu';
import DevStageMenu from './ControlMenus/DevStageMenu';
import DownloadMenu from './ControlMenus/DownloadMenu';
import ColorPickerMenu from './ControlMenus/ColorPickerMenu';
import {
  getInstancesOfType,
  getInstancesByGroups,
} from '../../services/instanceHelpers';
import { updateTimePointViewer } from '../../redux/actions/widget';

const MenuControl = ({
  anchorEl, handleClose, open, id, selection, viewerId,
}) => {
  const dispatch = useDispatch();
  const widgets = useSelector((state) => state.widgets);
  const currentWidget = widgets[viewerId];

  const [content, setContent] = useState(null);
  const [timePoint, setTimePoint] = useState(currentWidget?.config?.timePoint || 0);

  const layersList = ['Worm Body', 'Pharynx', 'NerveRing'];
  const downloadFiles = (option) => {
    console.log(`selected option: ${option}`);
    handleClose();
  };
  let instances = [];
  if (currentWidget) {
    instances = currentWidget.config.instances;
  }
  const groups = getInstancesByGroups(instances);
  const neurons = getInstancesOfType(instances, NEURON_TYPE) || [];
  const contacts = getInstancesOfType(instances, CONTACT_TYPE) || [];
  const synapses = getInstancesOfType(instances, SYNAPSE_TYPE) || [];

  useEffect(() => {
    if (currentWidget && timePoint !== currentWidget?.timePoint) {
      dispatch(updateTimePointViewer(viewerId, timePoint));
    }
  }, [timePoint]);

  useEffect(() => {
    switch (selection) {
      case VIEWER_MENU.devStage: setContent(
        <DevStageMenu
          timePoint={timePoint}
          setTimePoint={setTimePoint}
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
            dispatch={dispatch}
            viewerId={viewerId}
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
  }, [selection, instances]);

  return (
    <Popover
      id={id}
      className="custom-popover"
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
