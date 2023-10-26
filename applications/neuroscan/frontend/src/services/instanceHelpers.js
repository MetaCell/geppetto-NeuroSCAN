/* eslint-disable import/no-cycle */
import SimpleInstance from '@metacell/geppetto-meta-core/model/SimpleInstance';
import { invertColorsFlashing, setOriginalColors, updateWidgetConfig } from '../redux/actions/widget';
import urlService from './UrlService';
import zipService from './ZipService';
import store from '../redux/store';
import {
  CONTACT_TYPE, CPHATE_TYPE, filesURL, NEURON_TYPE, SYNAPSE_TYPE,
} from '../utilities/constants';
import NeuronColorLegendFile from '../assets/fullUniversal_ColorLegend.lgd';

const neuronColorLegend = [];
fetch(NeuronColorLegendFile)
  .then((response) => response.text())
  .then((data) => data.split('\n').forEach((r) => neuronColorLegend.push(r.split(','))));

export const instanceEqualsInstance = (instanceA, instanceB) => instanceA.uid === instanceB.uid
  && instanceA.instanceType === instanceB.instanceType;

export const invertColor = ({
  r, g, b, a,
}) => ({
  r: 1 - r, g: 1 - g, b: 1 - b, a,
});

export const invertColorSelectedInstances = (instances, selectedUids) => (
  instances
    .map((instance) => {
      if (selectedUids.indexOf(instance.uid) < 0) {
        return instance;
      }
      const { color } = instance;
      const newInstance = { ...instance };
      if (instance.colorOriginal) {
        newInstance.color = instance.flash ? invertColor(color) : color;
      } else if (color) {
        delete newInstance.color;
      } else {
        // eslint-disable-next-line object-curly-newline
        newInstance.color = { r: 1, g: 0, b: 0, a: 1 };
      }
      return newInstance;
    }));

export const setOriginalColorSelectedInstances = (instances, selectedUids) => (
  instances
    .map((instance) => {
      if (selectedUids.indexOf(instance.uid) < 0) {
        return instance;
      }
      const newInstance = {
        ...instance,
        flash: false,
        color: instance.colorOriginal ? instance.colorOriginal : instance.color,
      };
      if (!instance.colorOriginal || !instance.color) {
        delete newInstance.color;
        delete newInstance.colorOriginal;
      }
      return newInstance;
    }));

const updateInstanceSelected = (instances, selectedUids) => {
  const i = instances.map((instance) => {
    if (selectedUids.find((x) => x === instance.uid)) {
      return {
        ...instance,
        selected: true,
        flash: true,
        colorOriginal: instance.color,
        color: instance.color
          ? invertColor(instance.color)
          // eslint-disable-next-line object-curly-newline
          : { r: 1, g: 0, b: 0, a: 1 },
      };
    }
    return {
      ...instance,
      selected: false,
    };
  });
  return i;
};

const hideInstanceSelected = (instances, selectedUids) => instances.map((instance) => {
  if (selectedUids.find((x) => x === instance.uid)) {
    return {
      ...instance,
      hidden: true,
    };
  }
  return {
    ...instance,
  };
});

const showInstanceSelected = (instances, selectedUids) => instances.map((instance) => {
  if (selectedUids.find((x) => x === instance.uid)) {
    return {
      ...instance,
      hidden: false,
    };
  }
  return {
    ...instance,
  };
});

export const setSelectedInstances = (viewerId, instances, selectedUids) => {
  const newInstances = updateInstanceSelected(
    instances, selectedUids,
  );
  const colorPickerColor = selectedUids.length > 0
    ? newInstances.find((i) => i.uid === selectedUids[selectedUids.length - 1]).colorOriginal
    : null;
  store.dispatch(updateWidgetConfig(
    viewerId, {
      flash: true,
      hidden: false,
      instances: newInstances,
      colorPickerColor,
    },
  ));
  let counter = 1;
  const interval = setInterval(() => {
    if (counter === 6) {
      clearInterval(interval);
      store.dispatch(setOriginalColors(viewerId, selectedUids));
    } else {
      store.dispatch(invertColorsFlashing(viewerId, selectedUids));
    }
    counter += 1;
  }, 750);
};

export const deleteSelectedInstances = (viewerId, instances, selectedUids) => {
  const newInstances = instances.filter((instance) => !selectedUids.includes(instance.uid));
  store.dispatch(updateWidgetConfig(
    viewerId, {
      instances: newInstances,
    },
  ));
};

export const hideSelectedInstances = (viewerId, instances, selectedUids) => {
  const newInstances = hideInstanceSelected(instances, selectedUids);
  store.dispatch(updateWidgetConfig(
    viewerId, {
      instances: newInstances,
    },
  ));
};

export const showSelectedInstances = (viewerId, instances, selectedUids) => {
  const newInstances = showInstanceSelected(instances, selectedUids);
  store.dispatch(updateWidgetConfig(
    viewerId, {
      instances: newInstances,
    },
  ));
};

export const updateInstanceGroup = (instances, instanceList, newGroup = null) => instances
  .map((instance) => {
    if (instanceList.find((x) => x.uid === instance.uid)) {
      return {
        ...instance,
        group: newGroup === instance.group ? null : newGroup,
      };
    }
    return {
      ...instance,
    };
  });

export const setInstancesColor = (instances, instanceList, newColor = null) => instances
  .map((instance) => {
    if (instanceList.find((x) => x.uid === instance.uid)) {
      return {
        ...instance,
        color: newColor,
      };
    }
    return {
      ...instance,
    };
  });

const getDevStageFromTimepoint = (timepoint) => {
  const state = store.getState();
  const devStage = state.devStages.neuroSCAN
    .find((stage) => stage.timepoints !== null
      && stage.timepoints.includes(`${timepoint}`));
  return devStage.name;
};

export const getLocationPrefixFromType = (item) => {
  const devStage = getDevStageFromTimepoint(item.timepoint);
  switch (item.instanceType) {
    case NEURON_TYPE: {
      return `${filesURL}/neuroscan/${devStage}/${item.timepoint}/neurons/${item.filename}`;
    }
    case CONTACT_TYPE: {
      return `${filesURL}/neuroscan/${devStage}/${item.timepoint}/contacts/${item.filename}`;
    }
    case SYNAPSE_TYPE: {
      return `${filesURL}/neuroscan/${devStage}/${item.timepoint}/synapses/${item.filename}`;
    }
    case CPHATE_TYPE: {
      return `${filesURL}/neuroscan/${devStage}/${item.timepoint}/cphate/cphate.zip`;
    }
    default: {
      return '';
    }
  }
};

export const mapToInstance = (item) => {
  const fileName = item.filename || '';
  const location = getLocationPrefixFromType(item);

  let color = {
    r: Math.random(), g: Math.random(), b: Math.random(), a: 1,
  };

  if ('name' in item) {
    const colorLegend = neuronColorLegend.find((value, index) => value[0] === item.name);
    if (colorLegend) {
      color = {
        r: colorLegend[3] / 255,
        g: colorLegend[4] / 255,
        b: colorLegend[5] / 255,
        a: 1,
      };
    }
  }

  return {
    id: item.id,
    uid: `i_${item.uid.replace(/-/g, '_')}_${item.timepoint}`,
    uidFromDb: item.uid,
    name: item.name,
    selected: false,
    color,
    instanceType: item.instanceType,
    group: null,
    content: {
      type: 'url',
      location,
      fileName,
    },
    getId: () => this.id,
  };
};

const getContentService = (content) => {
  switch (content.type.toLowerCase()) {
    case 'zip':
      return zipService;
    default:
      return urlService;
  }
};

const createSimpleInstance = async (instance) => {
  const { content } = instance;

  // TODO: uncomment line below, for testing purpose always add sphere.obj
  const contentService = getContentService(content);
  // TODO: and remove these 3 lines
  // const contentService = urlService;
  // content.fileName = 'sphere.obj';
  // content.location = `${filesURL}/../uploads/${content.fileName}`;

  const base64Content = await contentService.getBase64(content.location, content.fileName);

  let visualValue;
  const fileExtension = content.fileName.split('.').pop().toLowerCase();
  switch (fileExtension) {
    case 'obj':
      visualValue = {
        eClass: window.GEPPETTO.Resources.OBJ,
        obj: base64Content,
      };
      break;
    case 'gltf':
      visualValue = {
        eClass: window.GEPPETTO.Resources.GLTF,
        gltf: base64Content,
      };
      break;
    default:
      visualValue = {
        eClass: window.GEPPETTO.Resources.OBJ,
        obj: base64Content,
      };
  }

  return new SimpleInstance({
    eClass: 'SimpleInstance',
    id: instance.uid,
    name: instance.name,
    type: { eClass: 'SimpleType' },
    visualValue,
  });
};

const removeDuplicates = (arr) => arr.filter(
  (v, i, a) => {
    const x = a.findIndex((t) => (t.getId() === v.getId()));
    return x === i;
  },
);

export const createSimpleInstancesFromInstances = (instances) => {
  // filter out already existing instances
  const newInstances = instances.filter(
    (instance) => !window.Instances.find((i) => i.wrappedObj.id === instance.uid),
  );
  return Promise.all(
    // create geppetto simple instances from the instances
    newInstances.map((instance) => createSimpleInstance(instance)),
  ).then((newSimpleInstances) => {
    // add the new simple instances to geppetto
    window.Instances = removeDuplicates([...window.Instances, ...newSimpleInstances]);
    window.GEPPETTO.Manager.augmentInstancesArray(window.Instances);
  });
};

export const getGroupsFromInstances = (instances) => (
  [
    ...new Set(
      instances
        .filter((instance) => instance.group)
        .map((instance) => instance.group),
    ),
  ]);

// export const groupBy = (items, key) => items
//   .filter((item) => item[key] !== null)
//   .reduce(
//     (result, item) => ({
//       ...result,
//       [item[key]]: [
//         ...(result[item[key]] || []),
//         item,
//       ],
//     }),
//     {},
//   );

export const groupBy = (items, key) => {
  const results = {};
  for (let i = 0; items.length > i; i += 1) {
    if (items[i][key] === null) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (!(items[i][key] in results)) {
      results[items[i][key]] = [];
    }
    results[items[i][key]].push(items[i]);
  }
  return results;
};

export const getInstancesOfType = (instances, instanceType) => (
  groupBy(instances, 'instanceType'))[instanceType];

export const getInstancesByGroups = (instances) => (
  groupBy(instances, 'group'));

export const handleSelect = (viewerId, selectedInstance, widgets) => {
  if (viewerId) {
    const { instances } = widgets[viewerId].config;
    setSelectedInstances(viewerId, instances, [selectedInstance.uid]);
  }
};

export const sortedInstances = (instances) => {
  instances.sort((a, b) => {
    const neuronsA = a.neurons.join('');
    const neuronsB = b.neurons.join('');
    return neuronsA.localeCompare(neuronsB);
  });

  instances.forEach((obj) => {
    if (obj.neurons.length > 1) {
      obj.neurons.sort();
    }
  });
  return instances;
};

export const sortedGroupedIterations = (items) => items.map((innerArray) => innerArray.slice()
  .sort((a, b) => a.name.localeCompare(b.name)));

export async function fetchDataForEntity(service, timePoint, entities) {
  if (entities.length === 0) return [];
  const newEntities = await service.getByUID(timePoint, entities.map((e) => e.uidFromDb));
  return newEntities;
}
