import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { VIEWERS } from '../../utilities/constants';
import { addViewer } from '../../redux/actions/viewers';
import cphateService from '../../services/CphateService';

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
    dispatch(addViewer(VIEWERS.InstanceViewer, cphateInstances));
  };

  const createEmptyViewer = () => {
    dispatch(addViewer(VIEWERS.InstanceViewer, []));
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
