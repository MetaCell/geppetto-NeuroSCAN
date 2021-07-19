/* eslint-disable */
/**
 * NeuroScan
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


import ApiClient from "../ApiClient";
import Error from '../model/Error';
import NewPromoter from '../model/NewPromoter';
import Promoter from '../model/Promoter';

/**
* Promoter service.
* @module api/PromoterApi
* @version 1.0.0
*/
export default class PromoterApi {

    /**
    * Constructs a new PromoterApi. 
    * @alias module:api/PromoterApi
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
    promotersCountGetWithHttpInfo() {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Object;
      return this.apiClient.callApi(
        '/promoters/count', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Object}
     */
    promotersCountGet() {
      return this.promotersCountGetWithHttpInfo()
        .then(function(response_and_data) {
          return response_and_data.data;
        });
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
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/Promoter>} and HTTP response
     */
    promotersGetWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        '_limit': opts['limit'],
        '_sort': opts['sort'],
        '_start': opts['start'],
        '_eq': opts['eq'],
        '_ne': opts['ne'],
        '_lt': opts['lt'],
        '_lte': opts['lte'],
        '_gt': opts['gt'],
        '_gte': opts['gte'],
        '_contains': opts['contains'],
        '_containss': opts['containss'],
        '_in': this.apiClient.buildCollectionParam(opts['_in'], 'multi'),
        '_nin': this.apiClient.buildCollectionParam(opts['nin'], 'multi')
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [Promoter];
      return this.apiClient.callApi(
        '/promoters', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
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
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/Promoter>}
     */
    promotersGet(opts) {
      return this.promotersGetWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Delete a record
     * @param {String} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Number} and HTTP response
     */
    promotersIdDeleteWithHttpInfo(id) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling promotersIdDelete");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = 'Number';
      return this.apiClient.callApi(
        '/promoters/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Delete a record
     * @param {String} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Number}
     */
    promotersIdDelete(id) {
      return this.promotersIdDeleteWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * @param {String} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Promoter} and HTTP response
     */
    promotersIdGetWithHttpInfo(id) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling promotersIdGet");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Promoter;
      return this.apiClient.callApi(
        '/promoters/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * @param {String} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Promoter}
     */
    promotersIdGet(id) {
      return this.promotersIdGetWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Update a record
     * @param {String} id 
     * @param {module:model/NewPromoter} newPromoter 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Promoter} and HTTP response
     */
    promotersIdPutWithHttpInfo(id, newPromoter) {
      let postBody = newPromoter;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling promotersIdPut");
      }
      // verify the required parameter 'newPromoter' is set
      if (newPromoter === undefined || newPromoter === null) {
        throw new Error("Missing the required parameter 'newPromoter' when calling promotersIdPut");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = Promoter;
      return this.apiClient.callApi(
        '/promoters/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Update a record
     * @param {String} id 
     * @param {module:model/NewPromoter} newPromoter 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Promoter}
     */
    promotersIdPut(id, newPromoter) {
      return this.promotersIdPutWithHttpInfo(id, newPromoter)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Create a new record
     * @param {module:model/NewPromoter} newPromoter 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Promoter} and HTTP response
     */
    promotersPostWithHttpInfo(newPromoter) {
      let postBody = newPromoter;
      // verify the required parameter 'newPromoter' is set
      if (newPromoter === undefined || newPromoter === null) {
        throw new Error("Missing the required parameter 'newPromoter' when calling promotersPost");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = Promoter;
      return this.apiClient.callApi(
        '/promoters', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Create a new record
     * @param {module:model/NewPromoter} newPromoter 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Promoter}
     */
    promotersPost(newPromoter) {
      return this.promotersPostWithHttpInfo(newPromoter)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
