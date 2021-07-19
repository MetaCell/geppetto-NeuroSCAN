import { NeuronApi } from '../rest';

export class NeuronService {
  constructor() {
    this.api = new NeuronApi();
  }

  async getNeuronById(id) {
    return this.api.neuronsIdGet(id, undefined);
  }
}

export default new NeuronService();
