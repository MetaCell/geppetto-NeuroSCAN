import { Configuration } from '../rest/runtime';
import { DevelopmentalStageApi } from '../rest';

export class DevStagesService {
  api: DevelopmentalStageApi;

  constructor() {
    this.api = new DevelopmentalStageApi(new Configuration({}));
  }

  async getDevStages() {
    return this.api.developmentalStagesGet({});
  }
}

export default new DevStagesService();
