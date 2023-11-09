/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import React, { forwardRef, useState } from 'react';
import Canvas from '@metacell/geppetto-meta-ui/3d-canvas/Canvas';
import { withStyles } from '@material-ui/core/styles';
import './cameraControls.css';
import {
  deleteSelectedInstances,
  mapToInstance,
  setSelectedInstances,
} from '../../services/instanceHelpers';
import {
  GREY_OUT_MESH_COLOR,
  VIEWERS,
} from '../../utilities/constants';
import neuronService from '../../services/NeuronService';
import AddToViewerMenu from '../Sidebar/AddToViewerMenu';

function shouldApplyGreyOut(instance, highlightedInstances) {
  if (instance.color || highlightedInstances.length === 0) {
    return false;
  }

  return !highlightedInstances.some((highlighted) => instance.name.includes(highlighted));
}

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

    this.state = {
      contextMenuOpen: false,
      contextMenuPosition: { top: 0, left: 0 },
      contextMenuInstance: null,
    };

    this.timeoutRef = React.createRef();
    this.tooltipRef = React.createRef();
    this.onMount = this.onMount.bind(this);
    this.onSelection = this.onSelection.bind(this);
    this.hoverListener = this.hoverListener.bind(this);
    this.initCanvasData = this.initCanvasData.bind(this);
  }

  componentDidMount() {
    this.handleDeleteKeyPress = (event) => {
      if ((event.key === 'Delete' || event.key === 'Backspace')) {
        const { selectedInstanceToDelete } = this.props;
        deleteSelectedInstances(selectedInstanceToDelete.viewerId, selectedInstanceToDelete.uid);
      }
    };
    window.addEventListener('keydown', this.handleDeleteKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleDeleteKeyPress);
  }

  onMount(scene) {
    // eslint-disable-next-line no-console
    console.log(scene);
  }

  onSelection(selectedInstances, event) {
    const {
      viewerId, instances, type,
    } = this.props;
    if (selectedInstances.length > 0) {
      if (event.button === 0) { // left click
        setSelectedInstances(viewerId, instances, selectedInstances);
      } else if (event.button === 2 && type === VIEWERS.CphateViewer) { // right click
        const selectedUid = selectedInstances[0];
        const selectedInstance = instances.find((i) => i.uid === selectedUid);
        if (selectedInstance) {
          this.setState({
            contextMenuOpen: true,
            contextMenuPosition: {
              top: event.clientY,
              left: event.clientX,
            },
            contextMenuInstance: selectedInstance,
          });
        }
      }
    }
  }

  handleAddInstancesToViewer = async (addToViewerId = null) => {
    const {
      addInstancesToViewer,
      cloneViewerWithInstancesList,
      timePoint, viewerId,
    } = this.props;
    const { contextMenuInstance } = this.state;
    if (contextMenuInstance) {
      const uids = contextMenuInstance.name.split('(')[0].split(',').map((uid) => uid.trim());
      neuronService.getByUID(timePoint, uids)
        .then((fetchedNeurons) => {
          const instances = fetchedNeurons.map((neuron) => mapToInstance(neuron));
          if (addToViewerId) {
            addInstancesToViewer(addToViewerId, instances);
          } else {
            cloneViewerWithInstancesList(viewerId, instances);
          }
        });
    }
    this.handleMenuClose();
  };

  handleMenuClose = () => {
    this.setState({ contextMenuOpen: false, contextMenuInstance: null });
  };

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
    const { instances, highlightedInstances } = this.props;

    return instances.filter((instance) => !instance.hidden).map((instance) => {
      let { color } = instance;

      if (shouldApplyGreyOut(instance, highlightedInstances)) {
        color = GREY_OUT_MESH_COLOR;
      }

      return {
        instancePath: instance.uid,
        color,
      };
    });
  }

  render() {
    const {
      classes,
      viewerId,
      cameraOptions,
      captureOptions,
      backgroundColor,
      loadingStarted,
      loadingFinished,
    } = this.props;

    const { contextMenuOpen, contextMenuPosition } = this.state;

    const canvasData = this.initCanvasData();
    return (
      <div className={classes.canvasContainer}>
        <div>
          <CanvasToolTip
            visible
            ref={this.tooltipRef}
          />
        </div>
        {contextMenuOpen && (
        <AddToViewerMenu
          handleClose={() => this.handleMenuClose()}
          handleAddToViewer={this.handleAddInstancesToViewer}
          useAnchorPosition
          anchorPosition={{ top: contextMenuPosition.top, left: contextMenuPosition.left }}
        />
        )}
        <Canvas
          key={viewerId}
          data={canvasData}
          cameraOptions={cameraOptions}
          captureOptions={captureOptions}
          hoverListeners={[this.hoverListener]}
          backgroundColor={backgroundColor}
          onSelection={this.onSelection}
          onMount={this.onMount}
          updateStarted={loadingStarted}
          updateEnded={loadingFinished}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Viewer);
