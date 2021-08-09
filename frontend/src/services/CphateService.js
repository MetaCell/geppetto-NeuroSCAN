import superagent from 'superagent';
import { backendURL } from '../utilities/constants';

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getInstances",] }]
*/
export class CphateService {
  constructor() {
    this.cphateJsonUrl = `${backendURL}/obj/data/cphate/cphate.json`;
  }

  async getCphate() {
    const url = this.cphateJsonUrl;
    return superagent.get(url);
  }

  mapCphateInstance(obj) {
    const fileName = obj.objFile.substring(obj.objFile.lastIndexOf('/') + 1);
    const id = `Cphate_${obj.i}_${obj.g}`;
    return {
      id,
      uid: id,
      files: [`${backendURL}/obj/data/cphate/${fileName}`],
      getId: () => this.id,
    };
  }

  async getInstances(devStage) {
    // ToDo: get the cphate for the given devstage
    return this.getCphate()
      .then((response) => {
        /*
         * ToDo: remove the slice(0, 1000) and find a solution for the Failed to fetch error message
         * when fetching in the Promise.all() of the
         */
        const cphate = response.body.slice(0, 1000);
        const simpleObjects = cphate.map((obj) => this.mapCphateInstance(obj));
        return simpleObjects;
      });
  }
}

export default new CphateService();
