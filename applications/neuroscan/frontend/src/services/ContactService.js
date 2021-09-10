import qs from 'qs';
import { backendURL, backendClient, maxRecordsPerFetch } from '../utilities/constants';

const contactsUrl = '/contacts';

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getById", "constructQuery"] }]
*/
export class ContactService {
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

  constructQuery(searchState) {
    const { searchTerms } = searchState.filters;
    const results = searchState.results.contacts;
    const andPart = [];
    if (searchTerms.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let idx = 0; idx < Math.min(searchTerms.length, 2); idx++) {
        andPart.push({
          _or: [
            { 'neuronA.uid_contains': searchTerms[idx] },
            { 'neuronB.uid_contains': searchTerms[idx] },
          ],
        });
      }
    }
    if (searchTerms.length === 3) {
      // 3 terms so search for the third in the contacts UID field
      andPart.push({ uid_contains: searchTerms[2] });
    }
    return qs.stringify({
      _where: andPart,
      _sort: 'uid:ASC',
      _start: results.items.length,
      _limit: maxRecordsPerFetch,
    });
  }

  async search(searchState) {
    const query = this.constructQuery(searchState);
    const response = await backendClient.get(`${contactsUrl}?${query}`);
    return response.data;
  }

  async totalCount(searchState) {
    const query = this.constructQuery(searchState);
    const response = await backendClient.get(`${contactsUrl}/count?${query}`);
    return response.data;
  }
}

export default new ContactService();
