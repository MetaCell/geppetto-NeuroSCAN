import qs from 'qs';
import { CONTACT_TYPE, backendClient, maxRecordsPerFetch } from '../utilities/constants';

const contactsUrl = '/contacts';

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getById", "constructQuery", "getByUID"] }]
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

  async getByUID(timePoint, uids = []) {
    const query = `timepoint=${timePoint}${uids.map((uid, i) => `${(i === 0) ? '&' : ''}uid_in=${uid}`)}`;
    const response = await backendClient.get(`${contactsUrl}?${query}`);
    return response.data.map((contact) => ({
      instanceType: CONTACT_TYPE,
      ...contact,
    }));
  }

  async search(searchState) {
    const query = this.constructQuery(searchState);
    const response = await backendClient.get(`${contactsUrl}?${query}`);
    return response.data.map((contact) => ({
      instanceType: CONTACT_TYPE,
      ...contact,
    }));
  }

  async totalCount(searchState) {
    const query = this.constructQuery(searchState);
    const response = await backendClient.get(`${contactsUrl}/count?${query}`);
    return response.data;
  }

  constructQuery(searchState) {
    const { searchTerms, timePoint } = searchState.filters;
    const terms = searchTerms.join(',');

    return qs.stringify({
      terms,
      timepoint: timePoint,
      _start: searchState.results.contacts.items.length,
      _limit: maxRecordsPerFetch,
    });
  }
}

export default new ContactService();
