import { CphateApi } from '../rest';

export class CphateService {
  constructor() {
    this.api = new CphateApi();
  }

  async getNeuronById(id) {
    return this.api.cphatesIdGet(id);
  }
}

export default new CphateService();
