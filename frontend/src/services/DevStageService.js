import { DevelopmentalStageApi } from '../rest';

export class DevStageService {
  constructor() {
    this.api = new DevelopmentalStageApi();
  }

  async getDevStages() {
    return this.api.developmentalStagesGet(undefined, undefined);
  }
}

export default new DevStageService();
