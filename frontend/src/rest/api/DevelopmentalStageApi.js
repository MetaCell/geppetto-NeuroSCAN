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
import NewDevelopmentalStage from '../model/NewDevelopmentalStage';

/**
* DevelopmentalStage service.
* @module api/DevelopmentalStageApi
* @version 1.0.0
*/
export default class DevelopmentalStageApi {

    /**
    * Constructs a new DevelopmentalStageApi. 
    * @alias module:api/DevelopmentalStageApi
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
    developmentalStagesCountGetWithHttpInfo() {
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
        '/developmental-stages/count', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Object}
     */
    developmentalStagesCountGet() {
      return this.developmentalStagesCountGetWithHttpInfo()
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
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Object} and HTTP response
     */
    developmentalStagesGetWithHttpInfo(opts) {
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
      let returnType = Object;
      return this.apiClient.callApi(
        '/developmental-stages', 'GET',
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
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Object}
     */
    developmentalStagesGet(opts) {
      return this.developmentalStagesGetWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Delete a record
     * @param {String} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Number} and HTTP response
     */
    developmentalStagesIdDeleteWithHttpInfo(id) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling developmentalStagesIdDelete");
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
        '/developmental-stages/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Delete a record
     * @param {String} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Number}
     */
    developmentalStagesIdDelete(id) {
      return this.developmentalStagesIdDeleteWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * @param {String} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Object} and HTTP response
     */
    developmentalStagesIdGetWithHttpInfo(id) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling developmentalStagesIdGet");
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
      let returnType = Object;
      return this.apiClient.callApi(
        '/developmental-stages/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * @param {String} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Object}
     */
    developmentalStagesIdGet(id) {
      return this.developmentalStagesIdGetWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Update a record
     * @param {String} id 
     * @param {module:model/NewDevelopmentalStage} newDevelopmentalStage 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Object} and HTTP response
     */
    developmentalStagesIdPutWithHttpInfo(id, newDevelopmentalStage) {
      let postBody = newDevelopmentalStage;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling developmentalStagesIdPut");
      }
      // verify the required parameter 'newDevelopmentalStage' is set
      if (newDevelopmentalStage === undefined || newDevelopmentalStage === null) {
        throw new Error("Missing the required parameter 'newDevelopmentalStage' when calling developmentalStagesIdPut");
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
      let returnType = Object;
      return this.apiClient.callApi(
        '/developmental-stages/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Update a record
     * @param {String} id 
     * @param {module:model/NewDevelopmentalStage} newDevelopmentalStage 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Object}
     */
    developmentalStagesIdPut(id, newDevelopmentalStage) {
      return this.developmentalStagesIdPutWithHttpInfo(id, newDevelopmentalStage)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Create a new record
     * @param {module:model/NewDevelopmentalStage} newDevelopmentalStage 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Object} and HTTP response
     */
    developmentalStagesPostWithHttpInfo(newDevelopmentalStage) {
      let postBody = newDevelopmentalStage;
      // verify the required parameter 'newDevelopmentalStage' is set
      if (newDevelopmentalStage === undefined || newDevelopmentalStage === null) {
        throw new Error("Missing the required parameter 'newDevelopmentalStage' when calling developmentalStagesPost");
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
      let returnType = Object;
      return this.apiClient.callApi(
        '/developmental-stages', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Create a new record
     * @param {module:model/NewDevelopmentalStage} newDevelopmentalStage 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Object}
     */
    developmentalStagesPost(newDevelopmentalStage) {
      return this.developmentalStagesPostWithHttpInfo(newDevelopmentalStage)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
