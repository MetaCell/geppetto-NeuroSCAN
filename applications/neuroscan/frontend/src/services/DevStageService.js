import { backendClient } from '../utilities/constants';

const devStagesBackendUrl = '/developmental-stages';

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getDevStages",] }]
*/
export class DevStageService {
  async getDevStages() {
    const response = await backendClient.get(`${devStagesBackendUrl}`);
    return response.data;
  }
}

export default new DevStageService();
