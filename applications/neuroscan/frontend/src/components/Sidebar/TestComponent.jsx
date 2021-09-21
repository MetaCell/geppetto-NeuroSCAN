import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import cphateService from '../../services/CphateService';
import { addToWidget } from '../../utilities/functions';

function TestComponent() {
  const dispatch = useDispatch();

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
    dispatch(await addToWidget(null, cphateInstances));
  };

  const createEmptyViewer = async () => {
    dispatch(await addToWidget(null, []));
  };

  return (
    <div>
      <Button color="secondary" onClick={() => createEmptyViewer()}>
        Add Viewer
      </Button>
      <Button color="secondary" onClick={() => createCphateViewer(300)}>
        Add CPhate Viewer
      </Button>
    </div>
  );
}

export default TestComponent;
