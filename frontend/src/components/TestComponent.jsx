import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { VIEWERS } from '../constants';
import { addViewer } from '../redux/actions/viewers';
import neuronService from '../services/NeuronService';
import {
  Neuron,
} from '../rest';

function TestComponent(props) {
  const dispatch = useDispatch();
  const [instance, setInstance] = useState();

  useEffect(async () => {
    setInstance(await neuronService.getNeuronById(27));
  }, [props]);
  return (
    <div>
      {instance
        ? (
          <Button color="secondary" onClick={() => dispatch(addViewer(VIEWERS.MorphologyViewer, [instance]))}>
            Add Viewer
          </Button>
        )
        : null}
    </div>
  );
}

export default TestComponent;
