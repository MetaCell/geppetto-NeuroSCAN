import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { VIEWERS } from '../utilities/constants';
import { addInstancesViewer, addViewer, colorInstancesViewer } from '../redux/actions/viewers';
import neuronService from '../services/NeuronService';
import contactService from '../services/ContactService';
import { Contact, Neuron } from '../rest';

function TestComponent(props) {
  const dispatch = useDispatch();
  const [instance1, setInstance1] = useState();
  const [instance2, setInstance2] = useState();
  const viewerId = useSelector((state) => Object.keys(state.viewers)[0]);
  const neuronFallOver = new Neuron('27', 'TestUIDNeuron1');
  neuronFallOver.files = ['https://raw.githubusercontent.com/MetaCell/geppetto-meta/master/geppetto.js/geppetto-ui/src/3d-canvas/showcase/examples/SketchVolumeViewer_SAAVR_SAAVR_1_1_0000_draco.gltf'];
  const contactFallOver = new Contact('1', 'TestUIDContact1');
  contactFallOver.files = ['https://raw.githubusercontent.com/MetaCell/geppetto-meta/feature/106/geppetto.js/geppetto-ui/src/3d-canvas/showcase/examples/Sketch_Volume_Viewer_AIB_Rby_AIAR_AIB_Rby_AIAR_1_1_0000_green_0_24947b6670.gltf'];

  useEffect(async () => {
    let neuron;
    try {
      neuron = await neuronService.getNeuronById(27);
    } catch (e) {
      neuron = neuronFallOver;
    }
    let contact;
    try {
      contact = await contactService.getContactById(1);
    } catch (e) {
      contact = contactFallOver;
    }
    setInstance1(neuron);
    setInstance2(contact);
  }, [props]);

  return (
    <div>
      {instance1
        ? (
          <Button color="secondary" onClick={() => dispatch(addViewer(VIEWERS.MorphologyViewer, [instance1]))}>
            Add Viewer
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
