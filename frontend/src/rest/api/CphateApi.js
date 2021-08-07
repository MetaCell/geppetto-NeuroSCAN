/* eslint-disable */
/**
 * NeuroScan (latest)
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: info@metacell.us
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Cphate from '../model/Cphate';
import Error from '../model/Error';
import NewCphate from '../model/NewCphate';

/**
* Cphate service.
* @module api/CphateApi
* @version 1.0.0
*/
export default class CphateApi {
  /**
    * Constructs a new CphateApi.
    * @alias module:api/CphateApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Object} and HTTP response
     */
  cphatesCountGetWithHttpInfo() {
    const postBody = null;

    const pathParams = {
    };
    const queryParams = {
    };
    const headerParams = {
    };
    const formParams = {
    };

    const authNames = ['bearerAuth'];
    const contentTypes = [];
    const accepts = ['application/json'];
    const returnType = Object;
    return this.apiClient.callApi(
      '/cphates/count', 'GET',
      pathParams, queryParams, headerParams, formParams, postBody,
      authNames, contentTypes, accepts, returnType, null,
    );
  }

  /**
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Object}
     */
  cphatesCountGet() {
    return this.cphatesCountGetWithHttpInfo()
      .then((response_and_data) => response_and_data.data);
  }

  /**
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of results possible
     * @param {String} opts.sort Sort according to a specific field.
     * @param {Number} opts.start Skip a specific number of entries (especially useful for pagination)
     * @param {String} opts.eq Get entries that matches exactly your input
     * @param {String} opts.ne Get records that are not equals to something
     * @param {String} opts.lt Get record that are lower than a value
     * @param {String} opts.lte Get records that are lower than or equal to a value
     * @param {String} opts.gt Get records that are greater than a value
     * @param {String} opts.gte Get records that are greater than  or equal a value
     * @param {String} opts.contains Get records that contains a value
     * @param {String} opts.containss Get records that contains (case sensitive) a value
     * @param {Array.<String>} opts._in Get records that matches any value in the array of values
     * @param {Array.<String>} opts.nin Get records that doesn't match any value in the array of values
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/Cphate>} and HTTP response
     */
  cphatesGetWithHttpInfo(opts) {
    opts = opts || {};
    const postBody = null;

    const pathParams = {
    };
    const queryParams = {
      _limit: opts.limit,
      _sort: opts.sort,
      _start: opts.start,
      _eq: opts.eq,
      _ne: opts.ne,
      _lt: opts.lt,
      _lte: opts.lte,
      _gt: opts.gt,
      _gte: opts.gte,
      _contains: opts.contains,
      _containss: opts.containss,
      _in: this.apiClient.buildCollectionParam(opts._in, 'multi'),
      _nin: this.apiClient.buildCollectionParam(opts.nin, 'multi'),
    };
    const headerParams = {
    };
    const formParams = {
    };

    const authNames = ['bearerAuth'];
    const contentTypes = [];
    const accepts = ['application/json'];
    const returnType = [Cphate];
    return this.apiClient.callApi(
      '/cphates', 'GET',
      pathParams, queryParams, headerParams, formParams, postBody,
      authNames, contentTypes, accepts, returnType, null,
    );
  }

  /**
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of results possible
     * @param {String} opts.sort Sort according to a specific field.
     * @param {Number} opts.start Skip a specific number of entries (especially useful for pagination)
     * @param {String} opts.eq Get entries that matches exactly your input
     * @param {String} opts.ne Get records that are not equals to something
     * @param {String} opts.lt Get record that are lower than a value
     * @param {String} opts.lte Get records that are lower than or equal to a value
     * @param {String} opts.gt Get records that are greater than a value
     * @param {String} opts.gte Get records that are greater than  or equal a value
     * @param {String} opts.contains Get records that contains a value
     * @param {String} opts.containss Get records that contains (case sensitive) a value
     * @param {Array.<String>} opts._in Get records that matches any value in the array of values
     * @param {Array.<String>} opts.nin Get records that doesn't match any value in the array of values
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/Cphate>}
     */
  cphatesGet(opts) {
    return this.cphatesGetWithHttpInfo(opts)
      .then((response_and_data) => response_and_data.data);
  }

  /**
     * Delete a record
     * @param {String} id
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Number} and HTTP response
     */
  cphatesIdDeleteWithHttpInfo(id) {
    const postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling cphatesIdDelete");
    }

    const pathParams = {
      id,
    };
    const queryParams = {
    };
    const headerParams = {
    };
    const formParams = {
    };

    const authNames = ['bearerAuth'];
    const contentTypes = [];
    const accepts = ['application/json'];
    const returnType = 'Number';
    return this.apiClient.callApi(
      '/cphates/{id}', 'DELETE',
      pathParams, queryParams, headerParams, formParams, postBody,
      authNames, contentTypes, accepts, returnType, null,
    );
  }

  /**
     * Delete a record
     * @param {String} id
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Number}
     */
  cphatesIdDelete(id) {
    return this.cphatesIdDeleteWithHttpInfo(id)
      .then((response_and_data) => response_and_data.data);
  }

  /**
     * @param {String} id
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Cphate} and HTTP response
     */
  cphatesIdGetWithHttpInfo(id) {
    const postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling cphatesIdGet");
    }

    const pathParams = {
      id,
    };
    const queryParams = {
    };
    const headerParams = {
    };
    const formParams = {
    };

    const authNames = ['bearerAuth'];
    const contentTypes = [];
    const accepts = ['application/json'];
    const returnType = Cphate;
    return this.apiClient.callApi(
      '/cphates/{id}', 'GET',
      pathParams, queryParams, headerParams, formParams, postBody,
      authNames, contentTypes, accepts, returnType, null,
    );
  }

  /**
     * @param {String} id
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Cphate}
     */
  cphatesIdGet(id) {
    return this.cphatesIdGetWithHttpInfo(id)
      .then((response_and_data) => response_and_data.data);
  }

  /**
     * Update a record
     * @param {String} id
     * @param {module:model/NewCphate} newCphate
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Cphate} and HTTP response
     */
  cphatesIdPutWithHttpInfo(id, newCphate) {
    const postBody = newCphate;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling cphatesIdPut");
    }
    // verify the required parameter 'newCphate' is set
    if (newCphate === undefined || newCphate === null) {
      throw new Error("Missing the required parameter 'newCphate' when calling cphatesIdPut");
    }

    const pathParams = {
      id,
    };
    const queryParams = {
    };
    const headerParams = {
    };
    const formParams = {
    };

    const authNames = ['bearerAuth'];
    const contentTypes = ['application/json'];
    const accepts = ['application/json'];
    const returnType = Cphate;
    return this.apiClient.callApi(
      '/cphates/{id}', 'PUT',
      pathParams, queryParams, headerParams, formParams, postBody,
      authNames, contentTypes, accepts, returnType, null,
    );
  }

  /**
     * Update a record
     * @param {String} id
     * @param {module:model/NewCphate} newCphate
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Cphate}
     */
  cphatesIdPut(id, newCphate) {
    return this.cphatesIdPutWithHttpInfo(id, newCphate)
      .then((response_and_data) => response_and_data.data);
  }

  /**
     * Create a new record
     * @param {module:model/NewCphate} newCphate
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Cphate} and HTTP response
     */
  cphatesPostWithHttpInfo(newCphate) {
    const postBody = newCphate;
    // verify the required parameter 'newCphate' is set
    if (newCphate === undefined || newCphate === null) {
      throw new Error("Missing the required parameter 'newCphate' when calling cphatesPost");
    }

    const pathParams = {
    };
    const queryParams = {
    };
    const headerParams = {
    };
    const formParams = {
    };

    const authNames = ['bearerAuth'];
    const contentTypes = ['application/json'];
    const accepts = ['application/json'];
    const returnType = Cphate;
    return this.apiClient.callApi(
      '/cphates', 'POST',
      pathParams, queryParams, headerParams, formParams, postBody,
      authNames, contentTypes, accepts, returnType, null,
    );
  }

  /**
     * Create a new record
     * @param {module:model/NewCphate} newCphate
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Cphate}
     */
  cphatesPost(newCphate) {
    return this.cphatesPostWithHttpInfo(newCphate)
      .then((response_and_data) => response_and_data.data);
  }
}
