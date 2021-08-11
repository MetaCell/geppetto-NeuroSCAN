import axios from 'axios';
import urlService from './UrlService';
import { backendURL } from '../utilities/constants';

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getInstances", "createTestCphate"] }]
*/
export class CphateService {
  constructor() {
    this.apiUrl = `${backendURL}/cphates`;
  }

  async createTestCphate() {
    const structure = await urlService.getFile(`${backendURL}/uploads/cphate_ec2d49f8e4.json`);
    return {
      id: 1,
      name: 'Cphate 1',
      structure: JSON.parse(structure),
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
        location: `${backendURL}${cphate.zipfile.url}`,
        fileName: obj.objFile.substring(obj.objFile.lastIndexOf('/') + 1),
      },
      getId: () => this.id,
    };
  }

  getInstances(cphate) {
    return cphate.structure.map((obj) => this.mapCphateInstance(cphate, obj));
  }

  async getCphateByTimepoint(timepoint) {
    return axios
      .get(this.apiUrl, {
        params: {
          timepoint,
        },
      })
      .then((response) => response.data[0]);
  }
}

export default new CphateService();
