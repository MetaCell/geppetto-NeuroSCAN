import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import { WidgetStatus } from '@metacell/geppetto-meta-client/common/layout/model';
import * as layoutActions from '@metacell/geppetto-meta-client/common/layout/actions';
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
import { getViewersFromWidgets, setInstanceSelected } from '../../../utilities/functions';

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

  const stateLayout = useSelector((state) => state.layout.layout);
  const widgets = useSelector((state) => state.widgets);
  const dispatch = useDispatch();

  const getTreeItemsFromData = () => getViewersFromWidgets(widgets).map((widget) => {
    const { viewerId, instances } = widget.config;
    const labelIcon = EXPLORER_IMGS.MORPHOLOGY;

    return (
      <StyledTreeItem
        nodeId={viewerId}
        labelText={widget.name}
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
                key={`${viewerId}_${instanceType}`}
                labelText={instanceType}
                labelIcon={EXPLORER_IMGS[instanceType.toUpperCase()]}
                labelInfo={items.length}
              >
                {items.map((instance) => (
                  <StyledTreeItem
                    key={`${viewerId}_${instanceType}_${instance.id}`}
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

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const getInstanceFromNodeId = (nodeId) => {
    const segments = nodeId.split('_');
    if (segments && segments.length === 3) {
      const viewerId = segments[0];
      const instanceType = segments[1];
      const instanceId = segments[2];
      const selectedInstance = widgets[viewerId].config.instances
        .find((instance) => `${instance.id}` === instanceId && instance.instanceType === instanceType);
      return { viewerId, selectedInstance };
    }
    return {};
  };

  const handleSelect = (event, nodeId) => {
    if (nodeId.split('_').length === 3) {
      const { viewerId, selectedInstance } = getInstanceFromNodeId(nodeId);
      if (viewerId) {
        // activate tab where viewer is located
        widgets[viewerId].status = WidgetStatus.ACTIVE;
        // set selected state of instance(s)
        widgets[viewerId].config.instances = setInstanceSelected(
          widgets[viewerId].config.instances,
          [selectedInstance.uid],
        );
        dispatch(layoutActions.updateWidget(widgets[viewerId]));
      }
    }
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
