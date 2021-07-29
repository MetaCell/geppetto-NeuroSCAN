import React, { useState } from 'react';
import { Typography, Box } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import StyledTreeItem from './TreeItem';
import DATASET from '../../images/dataset.svg';
import FOLDER from '../../images/folder.svg';
import FILE from '../../images/neuron.svg';

const Explorer = () => {
  const datasets = [
    {
      id: '1_1',
      text: 'Morphology Viewer',
      parent: true,
      items: [
        {
          id: '1_1_1',
          text: 'Neurons',
          items: [
            {
              id: '1_1_1_1',
              text: 'Neuron',
              price: 1200,
            },
            {
              id: '1_1_1_2',
              text: 'Neuron',
              price: 1450,
            },
          ],
        },
        {
          id: '1_1_2',
          text: 'Contacts',
          items: [
            {
              id: '1_1_2_1',
              text: 'Contact',
              price: 1200,
            },
            {
              id: '1_1_2_2',
              text: 'Contact',
              price: 1450,
            },
          ],
        },
        {
          id: '1_1_3',
          text: 'Synapses',
          items: [
            {
              id: '1_1_3_1',
              text: 'Synapse',
              price: 1200,
            },
            {
              id: '1_1_3_2',
              text: 'Synapse',
              price: 1450,
            },
          ],
        },
      ],
    },
    {
      id: '1_2',
      text: 'C-PHATE Plot Viewer',
      parent: true,
      items: [
        {
          id: '1_2_1',
          text: 'Cluster',
          items: [
            {
              id: '1_2_1_1',
              text: 'NIFTI',
              price: 240,
            },
            {
              id: '1_2_1_2',
              text: 'Matlab',
              price: 300,
            },
          ],
        },
        {
          id: '1_2_2',
          text: 'Cluster',
          items: [
            {
              id: '1_2_2_1',
              text: 'NIFTI',
              price: 240,
            },
            {
              id: '1_2_2_2',
              text: 'Matlab',
              price: 300,
            },
          ],
        },
        {
          id: '1_2_3',
          text: 'Cluster',
          items: [
            {
              id: '1_2_3_1',
              text: 'NIFTI',
              price: 240,
            },
            {
              id: '1_2_3_2',
              text: 'Matlab',
              price: 300,
            },
          ],
        },
      ],
    },
  ];

  // const [items, setItems] = useState(datasets);
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
    const labelProps = treeItemData?.parent
      ? { labelIcon: DATASET, iconClass: 'dataset' }
      // : itemLength > 0 ? { labelIcon: FOLDER, iconClass: 'folder' }
      : { labelIcon: FILE, iconClass: 'file' };

    return (
      <StyledTreeItem
        nodeId={treeItemData?.id}
        labelText={treeItemData?.text}
        labelIcon={labelProps?.labelIcon}
        labelInfo={itemLength}
        key={treeItemData?.id}
        iconClass={labelProps?.iconClass}
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
