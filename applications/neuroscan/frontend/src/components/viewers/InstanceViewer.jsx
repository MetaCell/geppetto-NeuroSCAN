/* eslint-disable import/no-cycle */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Canvas from '@metacell/geppetto-meta-ui/3d-canvas/Canvas';
import * as layoutActions from '@metacell/geppetto-meta-client/common/layout/actions';
import { makeStyles } from '@material-ui/core/styles';
import './cameraControls.css';
import {
  setSelectedInstances,
  invertColorSelectedInstances,
  setOriginalColorSelectedInstances,
} from '../../services/instanceHelpers';

const useStyles = makeStyles({
  canvasContainer: {
    width: '100%',
    height: '100%',
  },
});

const CanvasToolTip = (props) => {
  const {
    id,
    x,
    y,
    visible,
    text,
  } = props;
  return (
    <div
      id={id}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        minWidth: '100px',
        textAlign: 'center',
        padding: '5px 12px',
        fontFamily: 'monospace',
        background: '#a0c020',
        display: visible ? 'block' : 'none',
        opacity: '1',
        border: '1px solid black',
        boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)',
        transition: 'opacity 0.25s linear',
        borderRadius: '3px',
      }}
    >
      {text}
    </div>
  );
};

function InstanceViewer(props) {
  const {
    viewerId,
    instances,
    cameraOptions,
    recorderOptions,
    flash,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const widget = useSelector((state) => state.widgets[viewerId]);
  const [canvasData, setCanvasData] = useState([]);
  const [intersected, setIntersected] = useState(null);

  const camOptionsRef = useRef(null);
  const instancesRef = useRef([]);
  const timeoutRef = useRef(null);

  const findInstanceForObj = (obj) => {
    if (obj.instancePath) {
      return instancesRef.current
        .find((i) => i.uid === obj.instancePath);
    }
    return findInstanceForObj(obj.parent);
  };

  const hoverListener = (objs, canvasX, canvasY) => {
    const obj = objs[0];
    const intersectedInstance = findInstanceForObj(obj.object);
    if (!intersected || (intersectedInstance.uid !== intersected.o.uid)) {
      setIntersected({
        o: intersectedInstance,
        x: canvasX + 10, // move it 10 px so the onselect (onclick) will fire on the instance
        y: canvasY + 10, // and not on the tooltip ;-)
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIntersected(null);
      }, 3000);
    }
  };

  useEffect(() => {
    instancesRef.current = instances;
    setCanvasData(instances.map((instance) => ({
      instancePath: instance.uid,
      color: instance.color,
    })));
  }, [instances]);

  if (widget.config.flash) {
    let counter = 1;
    const interval = setInterval(() => {
      widget.config.instances = invertColorSelectedInstances(instancesRef.current);
      if (counter === 6) {
        clearInterval(interval);
        widget.config.instances = setOriginalColorSelectedInstances(instancesRef.current);
      }
      dispatch(layoutActions.updateWidget(widget));
      counter += 1;
    }, 1500);
    widget.config.flash = false;
    dispatch(layoutActions.updateWidget(widget));
  }

  const cameraHandler = (data) => {
    if (data.position.x !== 0) {
      camOptionsRef.current = data;
    }
  };

  const onSelection = (selectedInstances) => {
    setSelectedInstances(dispatch, widget, selectedInstances);
  };

  const onMount = (scene) => {
    // eslint-disable-next-line no-console
    console.log(scene);
  };

  let camOptions = {
    ...cameraOptions,
  };
  if (camOptionsRef.current) {
    // if we have a position then add it to the camOptions
    camOptions = {
      ...camOptions,
      position: camOptionsRef.current.position,
    };
  }

  return (
    <div className={classes.canvasContainer}>
      <div>
        { intersected && intersected.o
          && (
            <CanvasToolTip
              visible
              x={intersected.x}
              y={intersected.y}
              text={intersected.o.name}
              id={`canvas-tooltip-${intersected.o.uid}`}
            />
          )}
      </div>
      <Canvas
        key={viewerId}
        data={canvasData}
        cameraOptions={camOptions}
        cameraHandler={cameraHandler}
        recorderOptions={recorderOptions}
        hoverListeners={[hoverListener]}
        backgroundColor={0x2C2C2C}
        onSelection={onSelection}
        onMount={onMount}
      />
    </div>
  );
}

export default InstanceViewer;
