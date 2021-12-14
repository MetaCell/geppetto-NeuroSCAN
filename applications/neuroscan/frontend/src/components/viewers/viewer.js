/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import React, { forwardRef, useRef, useState } from 'react';
import Canvas from '@metacell/geppetto-meta-ui/3d-canvas/Canvas';
import { withStyles } from '@material-ui/core/styles';
import './cameraControls.css';
import {
  setSelectedInstances,
} from '../../services/instanceHelpers';

const styles = () => ({
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

class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.timeoutRef = React.createRef();
    this.tooltipRef = React.createRef();

    this.onMount = this.onMount.bind(this);
    this.onSelection = this.onSelection.bind(this);
    this.hoverListener = this.hoverListener.bind(this);
    this.initCanvasData = this.initCanvasData.bind(this);
  }

  onSelection(selectedInstances) {
    const { viewerId, instances } = this.props;
    setSelectedInstances(viewerId, instances, selectedInstances);
  }

  onMount(scene) {
    // eslint-disable-next-line no-console
    console.log(scene);
  }

  hoverListener(objs, canvasX, canvasY) {
    const obj = objs[0];
    const { instances } = this.props;
    const intersectedInstanceUid = this.findInstanceUidForObj(obj.object);
    const intersectedInstance = instances.find((i) => i.uid === intersectedInstanceUid);

    if (intersectedInstance?.uid) {
      this.tooltipRef?.current?.updateIntersected({
        o: intersectedInstance,
        x: canvasX + 10, // move it 10 px so the onselect (onclick) will fire on the instance
        y: canvasY + 10, // and not on the tooltip ;-)
      });

      if (this.timeoutRef.current) {
        clearTimeout(this.timeoutRef.current);
      }
      this.timeoutRef.current = setTimeout(() => {
        this.tooltipRef?.current?.updateIntersected(null);
      }, 1000);
    }
  }

  findInstanceUidForObj(obj) {
    if (obj.instancePath) {
      return obj.instancePath;
    }
    return this.findInstanceUidForObj(obj.parent);
  }

  initCanvasData() {
    const {
      instances,
    } = this.props;
    return (instances.filter((instance) => !instance.hidden).map((instance) => ({
      instancePath: instance.uid,
      color: instance.color,
    })));
  }

  render() {
    const {
      classes,
      viewerId,
      cameraOptions,
      captureOptions,
      backgroundColor,
    } = this.props;

    const canvasData = this.initCanvasData();
    return (
      <div className={classes.canvasContainer}>
        <div>
          <CanvasToolTip
            visible
            ref={this.tooltipRef}
          />
        </div>
        <Canvas
          key={viewerId}
          data={canvasData}
          cameraOptions={cameraOptions}
          captureOptions={captureOptions}
          hoverListeners={[this.hoverListener]}
          backgroundColor={backgroundColor}
          onSelection={this.onSelection}
          onMount={this.onMount}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Viewer);
