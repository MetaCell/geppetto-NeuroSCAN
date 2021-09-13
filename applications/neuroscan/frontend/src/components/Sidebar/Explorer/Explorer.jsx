import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import { getViewers } from '../../../utilities/functions';

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
  const [nodes, setNodes] = useState(['1_1']);

  const datasets = useSelector((state) => state.viewers);
  const layout = useSelector((state) => state.layout.layout.children);

  const onNodeToggle = (e, nodeIds) => {
    setNodes(nodeIds);
  };

  const getTreeItemsFromData = (viewers) => getViewers(layout)
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
                  labelText={instanceType}
                  labelIcon={EXPLORER_IMGS[instanceType.toUpperCase()]}
                  labelInfo={items.length}
                >
                  {items.map((instance) => (
                    <StyledTreeItem
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

  const treeRef = React.createRef();

  return (
    <Box className="wrap instances-box">
      {Object.entries(datasets).length === 0 ? (
        <Typography variant="caption">No viewers added yet</Typography>
      ) : (
        <TreeView
          className="scrollbar"
          defaultExpanded={nodes}
          defaultCollapseIcon={false}
          defaultExpandIcon={false}
          defaultEndIcon={false}
          ref={treeRef}
          expanded={nodes}
          onNodeToggle={onNodeToggle}
        >
          {getTreeItemsFromData(datasets)}
        </TreeView>
      )}
    </Box>
  );
};

export default Explorer;
