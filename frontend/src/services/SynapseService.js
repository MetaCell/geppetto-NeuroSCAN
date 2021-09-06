import axios from 'axios';
import qs from 'qs';
import { backendURL, maxRecordsPerFetch } from '../utilities/constants';

const synapsesBackendUrl = `${backendURL}/synapses`;

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getById", "search"] }]
*/
export class SynapseService {
  async getById(id) {
    return {
      id,
      uid: 'TestUIDContact1',
      content: {
        type: 'url',
        location: 'https://raw.githubusercontent.com/MetaCell/geppetto-meta/development/geppetto.js/geppetto-ui/src/3d-canvas/showcase/examples/Sketch_Volume_Viewer_AIB_Rby_AIAR_AIB_Rby_AIAR_1_1_0000_green_0_24947b6670.gltf',
        fileName: 'Sketch_Volume_Viewer_AIB_Rby_AIAR_AIB_Rby_AIAR_1_1_0000_green_0_24947b6670.gltf',
      },
      getId: () => this.id,
    };
  }

  async search(filters) {
    const { searchTerms } = filters;
    const andPart = [];
    if (searchTerms.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let idx = 0; idx < Math.min(searchTerms.length, 2); idx++) {
        andPart.push({
          _or: [
            { 'neuronPre.uid_contains': searchTerms[idx] },
            { 'neuronPost.uid_contains': searchTerms[idx] },
          ],
        });
      }
    }
    if (searchTerms.length === 3) {
      // 3 terms so search for the third in the contacts UID field
      andPart.push({ uid_contains: searchTerms[2] });
    }
    if (filters.synapses.chemical) {
      andPart.push({
        type: 'chemical',
      });
    }
    if (filters.synapses.electrical) {
      andPart.push({
        type: 'electrical',
      });
    }
    const query = qs.stringify({
      _where: andPart,
      _sort: 'uid:ASC',
      _limit: maxRecordsPerFetch,
    });
    const response = await axios.get(`${synapsesBackendUrl}?${query}`);
    return response.data;
  }

  async search2() {
    return [await this.getById(1), await this.getById(1)];
  }
}

export default new SynapseService();
