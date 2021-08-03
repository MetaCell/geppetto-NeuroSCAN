import { createSimpleGltfInstance } from '../utilities/functions';

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["createSimpleInstance"] }]
*/
export class MorphologyService {
  createSimpleInstance(instance) {
    return createSimpleGltfInstance(instance);
  }
}

export default new MorphologyService();
