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
  const datasets2 = [
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

  const datasets = useSelector((state) => state.viewers);

  const onNodeToggle = (e, nodeIds) => {
    setNodes(nodeIds);
  };

  const getTreeItemsFromData = (viewers) => Object.entries(viewers)
    .map(([viewerId, viewer]) => {
      const { instances } = viewer;
      const labelIcon = EXPLORER_IMGS.MORPHOLOGY;

      return (
        <StyledTreeItem
          nodeId={viewerId}
          labelText={viewerId}
          labelIcon={labelIcon}
          labelInfo={instances.length}
          key={viewerId}
        >
          {
            [NEURON_TYPE, CONTACT_TYPE, SYNAPSE_TYPE].map((instanceType) => {
              const items = instances.filter((instance) => instance.instanceType === instanceType);
              return (
                <StyledTreeItem
                  nodeId={`${viewerId}_${instanceType}`}
                  labelText={instanceType}
                  labelIcon={EXPLORER_IMGS[instanceType.toUpperCase()]}
                  labelInfo={items.length}
                >
                  {items.map((instance) => (
                    <StyledTreeItem
                      nodeId={`${viewerId}_${instanceType}_${instance.id}`}
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
