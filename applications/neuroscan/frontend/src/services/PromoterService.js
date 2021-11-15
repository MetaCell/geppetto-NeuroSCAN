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
    const { filters, promoters } = state;
    const andPart = [];
    andPart.push({ timePointStart_lte: filters.timepoint });
    andPart.push({ timePointEnd_gt: filters.timepoint });
    if (filters.searchString.length > 0) {
      andPart.push({ name_contains: filter.searchString });
    }
    if (filters.neurons.length > 0) {
      andPart.push({ _or: filter.neurons.map((neuron) => ({ 'cellsByLineaging.uid_contains': neuron })) });
    }
    return qs.stringify({
      _where: andPart,
      _sort: 'uid',
      _start: promoters.length,
      _limit: maxRecordsPerFetch,
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
