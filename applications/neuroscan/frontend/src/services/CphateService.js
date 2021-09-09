import { backendClient } from '../utilities/constants';

const cphateUrl = '/cphates';
const { baseURL } = backendClient.defaults;

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getInstances", "getCphateByTimepoint", "createTestCphate"] }]
*/
export class CphateService {
  async createTestCphate() {
    const structure = await backendClient.get(`${baseURL}/uploads/cphate_ec2d49f8e4.json`);
    return {
      id: 1,
      name: 'Cphate 1',
      structure: structure.data,
      zipfile: {
        url: '/uploads/cphate_ec2d49f8e4.zip',
      },
    };
  }

  mapCphateInstance(cphate, obj) {
    const id = `Cphate_${obj.i}_${obj.g}`;
    return {
      id,
      uid: id,
      content: {
        type: 'zip',
        location: `${baseURL}${cphate.zipfile.url}`,
        fileName: obj.objFile.substring(obj.objFile.lastIndexOf('/') + 1),
      },
      getId: () => this.id,
    };
  }

  getInstances(cphate) {
    return cphate.structure.map((obj) => this.mapCphateInstance(cphate, obj));
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
