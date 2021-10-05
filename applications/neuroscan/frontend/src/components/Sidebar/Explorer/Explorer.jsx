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
import GROUP from '../../../images/group.svg';
import { NEURON_TYPE, CONTACT_TYPE, SYNAPSE_TYPE } from '../../../utilities/constants';
import { getViewersFromWidgets } from '../../../utilities/functions';
import { setInstanceSelected } from '../../../services/instanceHelpers';

const EXPLORER_IMGS = {
  NEURONS,
  NEURON,
  CPHATE,
  CLUSTERS,
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
  const dispatch = useDispatch();

  const handleSelect = (viewerId, selectedInstance) => {
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
  };

  const ExplorerTreeItems = (props) => {
    const {
      viewerId,
      treeType,
      label,
      instances,
      groups,
      ...other
    } = props;
    return (
      <StyledTreeItem
        nodeId={`${viewerId}_${treeType}`}
        key={`${viewerId}_${treeType}`}
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
            onClick={() => handleSelect(viewerId, instance)}
            {...other}
          />
        ))}
      </StyledTreeItem>
    );
  };

  const getTreeItemsFromData = () => getViewersFromWidgets(widgets).map((widget) => {
    const { viewerId, instances } = widget.config;
    const labelIcon = EXPLORER_IMGS.MORPHOLOGY;
    const groups = [
      ...new Set(
        instances
          .filter((instance) => instance.group)
          .map((instance) => instance.group),
      )];

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
              <ExplorerTreeItems
                viewerId={`${viewerId}`}
                treeType={instanceType}
                label={`${instanceType}`}
                instances={items}
                groups={groups}
                hasExplorerMenu
              />
            );
          })
        }
        {
          groups.map((group) => {
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
          })
        }
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
          ref={treeRef}
        >
          {treeData}
        </TreeView>
      )}
    </Box>
  );
};

export default Explorer;
