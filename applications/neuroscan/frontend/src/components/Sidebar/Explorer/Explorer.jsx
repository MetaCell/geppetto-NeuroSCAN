import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import StyledTreeItem from './TreeItem';
import MORPHOLOGY from '../../../images/morphology.svg';
import NEURONS from '../../../images/neurons.svg';
import NEURON from '../../../images/neuron.svg';
import CPHATE from '../../../images/cphate.svg';
import CLUSTERS from '../../../images/cluster.svg';
import SYNAPSES from '../../../images/synapses.svg';
import SYNAPSE from '../../../images/synapse.svg';
import CONTACTS from '../../../images/contacts.svg';
import CONTACT from '../../../images/contact.svg';
import { NEURON_TYPE, CONTACT_TYPE, SYNAPSE_TYPE } from '../../../utilities/constants';
import { getViewersFromLayout } from '../../../utilities/functions';
import { updateSelectedInstances } from '../../../redux/actions/viewers';

const EXPLORER_IMGS = {
  NEURONS,
  NEURON,
  CPHATE,
  CLUSTERS,
  SYNAPSES,
  SYNAPSE,
  CONTACTS,
  CONTACT,
  MORPHOLOGY,
};

const Explorer = () => {
  const [treeData, setTreeData] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [expanded, setExpanded] = React.useState([]);

  const stateViewers = useSelector((state) => state.viewers);
  const stateLayout = useSelector((state) => state.layout.layout.children);
  const dispatch = useDispatch();

  const getTreeItemsFromData = (viewers, layout) => getViewersFromLayout(layout)
    .map((viewer) => {
      const { instances } = viewers[viewer.id];
      const labelIcon = EXPLORER_IMGS.MORPHOLOGY;

      return (
        <StyledTreeItem
          nodeId={viewer.id}
          labelText={viewer.name}
          labelIcon={labelIcon}
          labelInfo={instances.length}
          key={viewer.id}
        >
          {
            [NEURON_TYPE, CONTACT_TYPE, SYNAPSE_TYPE].map((instanceType) => {
              const items = instances.filter((instance) => instance.instanceType === instanceType);
              return (
                <StyledTreeItem
                  nodeId={`${viewer.id}_${instanceType}`}
                  key={`${viewer.id}_${instanceType}`}
                  labelText={instanceType}
                  labelIcon={EXPLORER_IMGS[instanceType.toUpperCase()]}
                  labelInfo={items.length}
                >
                  {items.map((instance) => (
                    <StyledTreeItem
                      key={`${viewer.id}_${instanceType}_${instance.id}`}
                      nodeId={`${viewer.id}_${instanceType}_${instance.id}`}
                      labelText={`${instance.name}`}
                      labelIcon={EXPLORER_IMGS[instanceType.toUpperCase()]}
                    />
                  ))}
                </StyledTreeItem>
              );
            })
          }
        </StyledTreeItem>
      );
    });

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const getInstanceFromNodeId = (nodeId) => {
    const segments = nodeId.split('_');
    if (segments && segments.length === 3) {
      const viewerId = segments[0];
      const instanceType = segments[1];
      const instanceId = segments[2];
      const selectedInstance = stateViewers[viewerId].instances
        .find((instance) => `${instance.id}` === instanceId && instance.instanceType === instanceType);
      return { viewerId, selectedInstance };
    }
    return {};
  };

  const handleSelect = (event, nodeId) => {
    if (nodeId.split('_').length === 3) {
      const { viewerId, selectedInstance } = getInstanceFromNodeId(nodeId);
      if (viewerId) {
        dispatch(updateSelectedInstances(viewerId, [selectedInstance.uid]));
      }
    }
  };

  useEffect(() => {
    setTreeData(getTreeItemsFromData(stateViewers, stateLayout));
    const itemsToSelect = Object.entries(stateViewers)
      .reduce((x, [viewerId, viewer]) => x.concat(viewer.instances
        .filter((instance) => instance.selected)
        .map((instance) => `${viewerId}_${instance.instanceType}_${instance.id}`)), []);
    const itemsToExpand = [];
    itemsToSelect.forEach((itemToSelect) => {
      let path = ''; // path prefix for the node
      itemToSelect.split('_').forEach((x) => {
        itemsToExpand.push(`${path}${x}`);
        path = `${path}${x}_`;
      });
    });
    setExpanded(itemsToExpand);
    setSelected(itemsToSelect);
  }, [stateViewers, stateLayout]);

  const treeRef = React.createRef();

  return (
    <Box className="wrap instances-box">
      {Object.entries(stateViewers).length === 0 ? (
        <Typography variant="caption">No viewers added yet</Typography>
      ) : (
        <TreeView
          className="scrollbar"
          defaultCollapseIcon={false}
          defaultExpandIcon={false}
          defaultEndIcon={false}
          selected={selected}
          expanded={expanded}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          ref={treeRef}
        >
          {treeData}
        </TreeView>
      )}
    </Box>
  );
};

export default Explorer;
