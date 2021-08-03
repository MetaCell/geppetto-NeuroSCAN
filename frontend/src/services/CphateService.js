import superagent from 'superagent';
import { backendURL } from '../utilities/constants';
import { createSimpleObjInstance } from '../utilities/functions';

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getInstances", "createSimpleInstance"] }]
*/
export class CphateService {
  constructor() {
    this.cphateJsonUrl = `${backendURL}/obj/data/cphate/cphate.json`;
  }

  async getCphate() {
    const url = this.cphateJsonUrl;
    return superagent.get(url);
  }

  async getInstances() {
    return this.getCphate()
      .then((response) => {
        /*
         * ToDo: remove the slice(0, 1000) and find a solution for the Failed to fetch error message
         * when fetching in the Promise.all() of the
         */
        const cphate = response.body.slice(0, 1000);
        let i = 0;
        const simpleObjects = cphate.map((obj) => {
          const fileName = obj.objFile.substring(obj.objFile.lastIndexOf('/') + 1);
          i += 1;
          return {
            id: `Cphate${i}`,
            uid: `Cphate${i}`,
            files: [`${backendURL}/obj/data/cphate/${fileName}`],
            getId: () => this.id,
          };
        });
        return simpleObjects;
      });
  }

  createSimpleInstance(instance) {
    return createSimpleObjInstance(instance);
  }
}

export default new CphateService();
