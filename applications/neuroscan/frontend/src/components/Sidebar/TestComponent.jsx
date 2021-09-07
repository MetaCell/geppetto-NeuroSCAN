import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { VIEWERS } from '../../utilities/constants';
import {
  addInstancesViewer, addViewer, colorInstancesViewer,
} from '../../redux/actions/viewers';
import neuronService from '../../services/NeuronService';
import contactService from '../../services/ContactService';
import cphateService from '../../services/CphateService';

function TestComponent(props) {
  const dispatch = useDispatch();
  const [instance1, setInstance1] = useState();
  const [instance2, setInstance2] = useState();
  const viewerId = useSelector((state) => Object.keys(state.viewers)[0]);

  useEffect(async () => {
    const neuron = await neuronService.getById(27);
    const contact = await contactService.getById(1);
    setInstance1(neuron);
    setInstance2(contact);
  }, [props]);

  const createCphateViewer = async (timepoint) => {
    let cphate;
    try {
      cphate = await cphateService.getCphateByTimepoint(timepoint);
    } finally {
      if (cphate === undefined) {
        cphate = await cphateService.createTestCphate();
      }
    }
    const cphateInstances = cphateService.getInstances(cphate);
    dispatch(addViewer(VIEWERS.InstanceViewer, cphateInstances));
  };

  return (
    <div>
      {instance1
        ? (
          <Button color="secondary" onClick={() => dispatch(addViewer(VIEWERS.InstanceViewer, [instance1]))}>
            Add Viewer
          </Button>
        )
        : null}
      {instance1
        ? (
          <Button color="secondary" onClick={() => createCphateViewer(300)}>
            Add CPhate Viewer
          </Button>
        )
        : null}
      {instance2 && viewerId
        ? (
          <Button color="secondary" onClick={() => dispatch(addInstancesViewer(viewerId, [instance2]))}>
            Add Instances
          </Button>
        )
        : null}
      {instance1 && viewerId
        ? (
          <Button
            color="secondary"
            onClick={() => dispatch(colorInstancesViewer(viewerId, [instance1], {
              r: Math.random(), b: Math.random(), g: Math.random(), a: 1,
            }))}
          >
            Change Color
          </Button>
        )
        : null}
    </div>
  );
}

export default TestComponent;
