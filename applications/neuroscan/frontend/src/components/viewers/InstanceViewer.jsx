/* eslint-disable import/no-cycle */
import React, { forwardRef, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Canvas from '@metacell/geppetto-meta-ui/3d-canvas/Canvas';
import { makeStyles } from '@material-ui/core/styles';
import { updateWidgetConfig } from '../../redux/actions/widget';
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

const CanvasToolTip = forwardRef((props, ref) => {
  const {
    visible,
  } = props;

  const [intersected, setIntersected] = useState(null);

  React.useImperativeHandle(
    ref,
    () => ({
      updateIntersected(updateSet) {
        setIntersected(updateSet);
      },

      getIntersected() {
        return intersected;
      },
    }),
  );

  return (
    <>
      { intersected && intersected.o
          && (
            <div
              id={`canvas-tooltip-${intersected?.o?.uid}`}
              style={{
                position: 'fixed',
                left: intersected?.x,
                top: intersected?.y,
                zIndex: 9999,
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
              {intersected?.o?.name}
            </div>
          )}
    </>
  );
});

const InstanceViewer = (props) => {
  const {
    viewerId,
    instances,
    flash,
    cameraOptions,
    captureOptions,
    backgroundColor,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const timeoutRef = useRef(null);
  const tooltipRef = useRef(null);

  const initCanvasData = () => {
    let i = instances;
    if (flash) {
      let counter = 1;
      const interval = setInterval(() => {
        i = invertColorSelectedInstances(i);
        if (counter === 6) {
          clearInterval(interval);
          i = setOriginalColorSelectedInstances(i);
        }
        dispatch(updateWidgetConfig(viewerId, { flash: false, instances: i }));
        counter += 1;
      }, 1500);
      dispatch(updateWidgetConfig(viewerId, { flash: false }));
    }
    return (i.map((instance) => ({
      instancePath: instance.uid,
      color: instance.color,
    })));
  };

  const canvasData = initCanvasData();

  const findInstanceForObj = (obj) => {
    if (obj.instancePath) {
      return instances
        .find((i) => i.uid === obj.instancePath);
    }
    return findInstanceForObj(obj.parent);
  };

  const hoverListener = (objs, canvasX, canvasY) => {
    const obj = objs[0];
    const intersectedInstance = findInstanceForObj(obj.object);
    if (intersectedInstance?.uid) {
      tooltipRef?.current?.updateIntersected({
        o: intersectedInstance,
        x: canvasX + 10, // move it 10 px so the onselect (onclick) will fire on the instance
        y: canvasY + 10, // and not on the tooltip ;-)
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        tooltipRef?.current?.updateIntersected(null);
      }, 3000);
    }
  };

  const onSelection = (selectedInstances) => {
    setSelectedInstances(viewerId, instances, selectedInstances);
  };

  const onMount = (scene) => {
    // eslint-disable-next-line no-console
    console.log(scene);
  };

  return (
    <div className={classes.canvasContainer}>
      <div>
        <CanvasToolTip
          visible
          ref={tooltipRef}
        />
      </div>
      <Canvas
        key={viewerId}
        data={canvasData}
        cameraOptions={cameraOptions}
        captureOptions={captureOptions}
        hoverListeners={[hoverListener]}
        backgroundColor={backgroundColor}
        onSelection={onSelection}
        onMount={onMount}
      />
    </div>
  );
};

export default InstanceViewer;
