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
  CPHATE_TYPE,
  VIEWER_MENU,
} from '../../utilities/constants';
import LayersMenu from './ControlMenus/LayersMenu';
import DevStageMenu from './ControlMenus/DevStageMenu';
import ColorPickerMenu from './ControlMenus/ColorPickerMenu';
import {
  getInstancesOfType,
  getInstancesByGroups,
} from '../../services/instanceHelpers';
import { updateTimePointViewer } from '../../redux/actions/widget';
import WarningModal from '../WarningModal';

const MenuControl = ({
  anchorEl, handleClose, open, id, selection, viewerId,
}) => {
  const dispatch = useDispatch();
  const widgets = useSelector((state) => state.widgets);
  const currentWidget = widgets[viewerId];

  const [content, setContent] = useState(null);
  const [timePoint, setTimePoint] = useState(currentWidget?.config?.timePoint || 0);

  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [instancesBeforeDispatch, setInstancesBeforeDispatch] = useState(null);
  const [lostInstances, setLostInstances] = useState([]);

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
  const clusters = getInstancesOfType(instances, CPHATE_TYPE) || [];

  useEffect(() => {
    setInstancesBeforeDispatch(currentWidget);
    if (currentWidget && timePoint !== currentWidget?.timePoint) {
      dispatch(updateTimePointViewer(viewerId, timePoint));
    }
  }, [timePoint, currentWidget, dispatch, viewerId]);

  useEffect(() => {
    if (instancesBeforeDispatch && currentWidget && timePoint !== currentWidget?.timePoint) {
      const instancesBeforeUpdate = instancesBeforeDispatch.config.instances;
      const lostInstancesArray = instancesBeforeUpdate.filter((item1) => !instances
        .some((item2) => item2.name === item1.name));
      if (lostInstancesArray?.length !== 0) {
        setOpenWarningModal(true);
        setLostInstances(lostInstancesArray);
      }
    }
  }, [timePoint, currentWidget]);

  useEffect(() => {
    switch (selection) {
      case VIEWER_MENU.devStage: setContent(
        <DevStageMenu
          timePoint={currentWidget?.config?.timePoint}
          setTimePoint={setTimePoint}
        />,
      );
        break;
      case VIEWER_MENU.layers: setContent(<LayersMenu layers={layersList} />);
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
            clusters={clusters}
          />,
        );
        break;
      default:
        setContent(null);
    }
  }, [selection, instances]);

  return (
    <>
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
      {
        openWarningModal && (
        <WarningModal
          open={openWarningModal}
          handleClose={() => setOpenWarningModal(false)}
          instances={lostInstances}
        />
        )
      }

    </>

  );
};

export default MenuControl;
