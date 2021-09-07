import axios from 'axios';
import qs from 'qs';
import { backendURL, maxRecordsPerFetch } from '../utilities/constants';

const neuronsBackendUrl = `${backendURL}/neurons`;

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getById", "search", "constructQuery"] }]
*/
export class NeuronService {
  async getById(id) {
    return {
      id,
      uid: 'SAAVR',
      content: {
        type: 'url',
        location: 'https://raw.githubusercontent.com/MetaCell/geppetto-meta/master/geppetto.js/geppetto-ui/src/3d-canvas/showcase/examples/SketchVolumeViewer_SAAVR_SAAVR_1_1_0000_draco.gltf',
        fileName: 'SketchVolumeViewer_SAAVR_SAAVR_1_1_0000_draco.gltf',
      },
      getId: () => this.id,
    };
  }

  constructQuery(searchState) {
    const { searchTerms } = searchState.filters;
    const results = searchState.results.neurons;
    return qs.stringify({
      _where: { _or: searchTerms.map((term) => ({ uid_contains: term })) },
      _sort: 'uid:ASC',
      _start: results.items.length,
      _limit: maxRecordsPerFetch,
    });
  }

  async search(searchState) {
    const query = this.constructQuery(searchState);
    const response = await axios.get(`${neuronsBackendUrl}?${query}`);
    return response.data;
  }

  async totalCount(searchState) {
    const query = this.constructQuery(searchState);
    const response = await axios.get(`${neuronsBackendUrl}/count?${query}`);
    return response.data;
  }
}

export default new NeuronService();
