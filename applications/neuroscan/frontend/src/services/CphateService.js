import { backendURL, backendClient, CPHATE_TYPE } from '../utilities/constants';
// eslint-disable-next-line import/no-cycle
import { getLocationPrefixFromType, sortedInstances } from './instanceHelpers';

const cphateUrl = '/cphates';

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getInstances", "getCphateByTimepoint", "createTestCphate"] }]
*/
export class CphateService {
  async createTestCphate() {
    const structure = await backendClient.get(`${backendURL}/uploads/cphate_ec2d49f8e4.json`);
    return {
      id: 1,
      name: 'Cphate 1',
      structure: structure.data,
      zipfile: {
        url: '/uploads/cphate_ec2d49f8e4.zip',
      },
    };
  }

  mapCphateInstance(cphate, cphateZipFile, obj) {
    const id = `Cphate_${cphate.timepoint}_${obj.i}_${obj.c}`;
    return {
      id,
      uid: id,
      name: `${obj.neurons.join(', ')} (${obj.c})`,
      i: obj.i,
      c: obj.c,
      selected: false,
      instanceType: CPHATE_TYPE,
      group: null,
      content: {
        type: 'zip',
        location: `${cphateZipFile}`,
        fileName: obj.objFile.substring(obj.objFile.lastIndexOf('/') + 1),
      },
      getId: () => this.id,
    };
  }

  getInstances(cphate) {
    const cphateZipFile = getLocationPrefixFromType({
      timepoint: cphate.timepoint,
      instanceType: CPHATE_TYPE,
    });
    const sortedCphateStructure = sortedInstances(cphate.structure);
    return sortedCphateStructure.map((obj) => this.mapCphateInstance(cphate, cphateZipFile, obj));
  }

  async getCphateByTimepoint(timepoint) {
    return backendClient
      .get(cphateUrl, {
        params: {
          timepoint,
        },
      })
      .then((response) => response.data[0]);
  }
}

export default new CphateService();
