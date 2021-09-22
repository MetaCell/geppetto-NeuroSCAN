import { backendClient } from '../utilities/constants';

const neuronsBackendUrl = '/developmental-stages';

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getDevStages",] }]
*/
export class DevStageService {
  async getDevStages() {
    const response = await backendClient.get(`${neuronsBackendUrl}`);
    return response.data;
  }
}

export default new DevStageService();
