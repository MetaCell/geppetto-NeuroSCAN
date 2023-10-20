import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import StyledTreeItem from './TreeItem';
import MORPHOLOGY from '../../../images/morphology.svg';
import NEURONS from '../../../images/neurons.svg';
import NEURON from '../../../images/neuron.svg';
import CPHATE from '../../../images/cphate.svg';
import CLUSTER from '../../../images/cluster.svg';
import SYNAPSES from '../../../images/synapses.svg';
import SYNAPSE from '../../../images/synapse.svg';
import CONTACTS from '../../../images/contacts.svg';
import CONTACT from '../../../images/contact.svg';
import GROUP from '../../../images/group.svg';
import {
  NEURON_TYPE,
  CONTACT_TYPE,
  SYNAPSE_TYPE,
  CPHATE_TYPE,
} from '../../../utilities/constants';
import { getViewersFromWidgets } from '../../../utilities/functions';
import {
  deleteSelectedInstances,
  getGroupsFromInstances,
  groupBy, handleSelect, sortedGroupedIterations,
} from '../../../services/instanceHelpers';

const EXPLORER_IMGS = {
  NEURONS,
  NEURON,
  CPHATE,
  CLUSTER,
  SYNAPSES,
  SYNAPSE,
  CONTACTS,
  CONTACT,
  GROUP,
  MORPHOLOGY,
};

const Explorer = () => {
  const [treeData, setTreeData] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [expanded, setExpanded] = React.useState([]);

  const stateLayout = useSelector((state) => state.layout.layout);
  const widgets = useSelector((state) => state.widgets);
  const ExplorerTreeItems = (props) => {
    const {
      viewerId,
      treeType,
      label,
      instances,
      groups,
      nodeId,
      ...other
    } = props;
    return (
      <StyledTreeItem
        nodeId={nodeId || `${viewerId}_${treeType}`}
        key={nodeId || `${viewerId}_${treeType}`}
        labelText={label}
        labelIcon={EXPLORER_IMGS[treeType.toUpperCase()]}
        labelInfo={instances.length}
      >
        {instances.map((instance) => (
          <StyledTreeItem
            key={`${viewerId}_${treeType}_${instance.id}`}
            nodeId={`${viewerId}_${instance.instanceType}_${instance.id}`}
            labelText={`${instance.name}`}
            labelIcon={EXPLORER_IMGS[instance.instanceType]}
            instance={instance}
            viewerId={viewerId}
            groups={groups}
            onClick={() => handleSelect(viewerId, instance, widgets)}
            {...other}
          />
        ))}
      </StyledTreeItem>
    );
  };

  const getTreeItemsFromData = () => getViewersFromWidgets(widgets).map((widget) => {
    const { viewerId, instances } = widget.config;
    const labelIcon = EXPLORER_IMGS.MORPHOLOGY;
    const groups = getGroupsFromInstances(instances);
    const iterations = Object.values(groupBy(
      instances.filter((instance) => instance.instanceType === CPHATE_TYPE),
      'i',
    ));

    const sortedIterations = sortedGroupedIterations(iterations);

    return (
      <StyledTreeItem
        nodeId={viewerId}
        labelText={widget.name}
        labelIcon={labelIcon}
        labelInfo={instances.length}
        key={viewerId}
      >
        { sortedIterations.length === 0
        && [NEURON_TYPE, CONTACT_TYPE, SYNAPSE_TYPE].map((instanceType) => {
          const items = instances.filter((instance) => instance.instanceType === instanceType);
          return (
            <ExplorerTreeItems
              viewerId={`${viewerId}`}
              treeType={instanceType}
              label={`${instanceType}`}
              instances={items}
              groups={groups}
              hasExplorerMenu
            />
          );
        })}
        { sortedIterations.length === 0
        && groups.map((group) => {
          const items = instances.filter((instance) => instance.group === group);
          return (
            <ExplorerTreeItems
              viewerId={`${viewerId}`}
              treeType="GROUP"
              label={`${group}`}
              instances={items}
              groups={groups}
            />
          );
        })}
        { sortedIterations.length !== 0
        && (
          <StyledTreeItem
            nodeId={`${viewerId}_clusters`}
            labelText="Clusters"
            labelIcon={EXPLORER_IMGS[CPHATE_TYPE.toLocaleUpperCase()]}
            labelInfo={sortedIterations.length}
            key={`${viewerId}_clusters`}
          >
            {
              sortedIterations.map((items) => (
                <ExplorerTreeItems
                  viewerId={`${viewerId}`}
                  nodeId={`${viewerId}_cluster_${items[0].i}`}
                  treeType={CPHATE_TYPE.toLocaleUpperCase()}
                  label={`${items[0].i}`}
                  instances={items}
                />
              ))
            }
          </StyledTreeItem>
        )}
      </StyledTreeItem>
    );
  });

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };
  useEffect(() => {
    setTreeData(getTreeItemsFromData());
    const itemsToSelect = Object.values(widgets)
      .reduce((x, widget) => x.concat(widget.config.instances
        .filter((instance) => instance.selected)
        .map((instance) => `${widget.config.viewerId}_${instance.instanceType}_${instance.id}`)), []);
    const itemsToExpand = [];
    itemsToSelect.forEach((itemToSelect) => {
      let path = ''; // path prefix for the node
      itemToSelect.split('_').forEach((x) => {
        itemsToExpand.push(`${path}${x}`);
        path = `${path}${x}_`;
      });
    });
    // set new expanded and retain the current expanded
    setExpanded([...new Set(expanded.concat(itemsToExpand))]);
    // set new selected
    setSelected(itemsToSelect);
  }, [stateLayout]);

  const treeRef = React.createRef();
  return (
    <Box className="wrap instances-box">
      {Object.entries(widgets).length === 0 ? (
        <Box pt={2}>
          <Typography align="center" display="block" variant="caption">No viewers added yet</Typography>
        </Box>
      ) : (
        <TreeView
          className="scrollbar"
          defaultCollapseIcon={false}
          defaultExpandIcon={false}
          defaultEndIcon={false}
          selected={selected}
          expanded={expanded}
          onNodeToggle={handleToggle}
          ref={treeRef}
        >
          {treeData}
        </TreeView>
      )}
    </Box>
  );
};

export default Explorer;
