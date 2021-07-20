import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { VIEWERS } from '../utilities/constants';
import { addInstancesViewer, addViewer, colorInstancesViewer } from '../redux/actions/viewers';
import neuronService from '../services/NeuronService';
import contactService from '../services/ContactService';

function TestComponent(props) {
  const dispatch = useDispatch();
  const [instance1, setInstance1] = useState();
  const [instance2, setInstance2] = useState();
  const viewerId = useSelector((state) => Object.keys(state.viewers)[0]);

  useEffect(async () => {
    setInstance1(await neuronService.getNeuronById(27));
    setInstance2(await contactService.getContactById(1));
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
              r: 0, b: 1, g: 0, a: 1,
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
