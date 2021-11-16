import { filter } from 'jszip';
import qs from 'qs';
import { backendClient, maxRecordsPerFetch } from '../utilities/constants';

const promotersUrl = '/promoters';

/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getById", "constructQuery", "getByUID"] }]
*/
export class PromoterService {
  async getByUID(uids = []) {
    const query = `${uids.map((uid, i) => `${(i === 0) ? '&' : ''}uid_in=${uid}`)}`;
    const response = await backendClient.get(`${promotersUrl}?${query}`);
    return response.data;
  }

  constructQuery(state) {
    const andPart = [];
    return qs.stringify({
      _where: andPart,
      _sort: 'uid',
    });
  }

  async totalCount(state) {
    const query = this.constructQuery(state);
    const response = await backendClient.get(`${promotersUrl}/count?${query}`);
    return response.data;
  }

  async search(state) {
    const query = this.constructQuery(state);
    const response = await backendClient.get(`${promotersUrl}?${query}`);
    return response.data;
  }
}

export default new PromoterService();
