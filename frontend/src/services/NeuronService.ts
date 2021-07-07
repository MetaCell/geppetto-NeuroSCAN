import { Configuration } from '../rest/runtime';
import { NeuronApi } from '../rest';

export class NeuronService {
  api: NeuronApi;

  constructor() {
    this.api = new NeuronApi(new Configuration({}));
  }

  async getNeuronsCount() {
    return this.api.neuronsCountGet();
  }
}

export default new NeuronService();
