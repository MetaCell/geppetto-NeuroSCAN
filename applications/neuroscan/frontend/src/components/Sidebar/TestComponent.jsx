import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import cphateService from '../../services/CphateService';
import { addInstances } from '../../redux/actions/widget';
import { VIEWERS } from '../../utilities/constants';

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
    dispatch(addInstances(null, cphateInstances, VIEWERS.CphateViewer));
  };

  const createEmptyViewer = async () => {
    dispatch(addInstances(null, [], VIEWERS.InstanceViewer));
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
