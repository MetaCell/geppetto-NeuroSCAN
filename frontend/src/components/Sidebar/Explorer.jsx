import React, { useState } from 'react';
import { Typography, Box } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import StyledTreeItem from './TreeItem';
import MORPHOLOGY from '../../images/morphology.svg';
import NEURONS from '../../images/neurons.svg';
import NEURON from '../../images/neuron.svg';
import CPHATE from '../../images/cphate.svg';
import CLUSTERS from '../../images/cluster.svg';
import SYNAPSES from '../../images/synapses.svg';
import SYNAPSE from '../../images/synapse.svg';
import CONTACTS from '../../images/contacts.svg';
import CONTACT from '../../images/contact.svg';

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
  const datasets = [
    {
      id: '1_1',
      text: 'Morphology Viewer',
      type: 'MORPHOLOGY',
      parent: true,
      items: [
        {
          id: '1_1_1',
          text: 'Neurons',
          type: 'NEURONS',
          items: [
            {
              id: '1_1_1_1',
              text: 'Neuron',
              type: 'NEURON',
            },
            {
              id: '1_1_1_2',
              text: 'Neuron',
              type: 'NEURON',
            },
          ],
        },
        {
          id: '1_1_2',
          text: 'Contacts',
          type: 'CONTACTS',
          items: [
            {
              id: '1_1_2_1',
              text: 'Contact',
              type: 'CONTACT',
            },
            {
              id: '1_1_2_2',
              text: 'Contact',
              type: 'CONTACT',
            },
          ],
        },
        {
          id: '1_1_3',
          text: 'Synapses',
          type: 'SYNAPSES',
          items: [
            {
              id: '1_1_3_1',
              text: 'Synapse',
              type: 'SYNAPSE',
            },
            {
              id: '1_1_3_2',
              text: 'Synapse',
              type: 'SYNAPSE',
            },
          ],
        },
      ],
    },
    {
      id: '1_2',
      text: 'C-PHATE Plot Viewer',
      parent: true,
      type: 'CPHATE',
      items: [
        {
          id: '1_2_1',
          text: 'Cluster',
          type: 'CLUSTERS',
          items: [
            {
              id: '1_2_1_1',
              text: 'Cluster',
              type: 'CLUSTERS',
            },
            {
              id: '1_2_1_2',
              text: 'Cluster',
              type: 'CLUSTERS',
            },
          ],
        },
        {
          id: '1_2_2',
          text: 'Cluster',
          type: 'CLUSTERS',
          items: [
            {
              id: '1_2_2_1',
              text: 'Cluster',
              type: 'CLUSTERS',
            },
            {
              id: '1_2_2_2',
              text: 'Cluster',
              type: 'CLUSTERS',
            },
          ],
        },
        {
          id: '1_2_3',
          text: 'Cluster',
          type: 'CLUSTERS',
          items: [
            {
              id: '1_2_3_1',
              text: 'Cluster',
              type: 'CLUSTERS',
            },
            {
              id: '1_2_3_2',
              text: 'Cluster',
              type: 'CLUSTERS',
            },
          ],
        },
      ],
    },
  ];

  const [nodes, setNodes] = useState(['1_1']);

  const onNodeToggle = (e, nodeIds) => {
    setNodes(nodeIds);
  };

  const getTreeItemsFromData = (treeItems) => treeItems.map((treeItemData) => {
    let items = [];
    if (treeItemData.items && treeItemData.items.length > 0) {
      items = getTreeItemsFromData(treeItemData.items);
    }
    const itemLength = items?.length;
    const labelIcon = EXPLORER_IMGS[treeItemData?.type];

    return (
      <StyledTreeItem
        nodeId={treeItemData?.id}
        labelText={treeItemData?.text}
        labelIcon={labelIcon}
        labelInfo={itemLength}
        key={treeItemData?.id}
      >
        {items}
      </StyledTreeItem>
    );
  });

  const treeRef = React.createRef();

  return (
    <Box className="wrap instances-box">
      {datasets.length === 0 ? (
        <Typography variant="caption">No Instance Added yet</Typography>
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
