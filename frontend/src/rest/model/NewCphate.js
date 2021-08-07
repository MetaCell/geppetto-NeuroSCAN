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

/**
 * The NewCphate model module.
 * @module model/NewCphate
 * @version 1.0.0
 */
class NewCphate {
  /**
     * Constructs a new <code>NewCphate</code>.
     * @alias module:model/NewCphate
     */
  constructor() {
    NewCphate.initialize(this);
  }

  /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
  static initialize(obj) {
  }

  /**
     * Constructs a <code>NewCphate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NewCphate} obj Optional instance to populate.
     * @return {module:model/NewCphate} The populated <code>NewCphate</code> instance.
     */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new NewCphate();

      if (data.hasOwnProperty('name')) {
        obj.name = ApiClient.convertToType(data.name, 'String');
      }
      if (data.hasOwnProperty('structure')) {
        obj.structure = ApiClient.convertToType(data.structure, Object);
      }
      if (data.hasOwnProperty('timepoints')) {
        obj.timepoints = ApiClient.convertToType(data.timepoints, Object);
      }
      if (data.hasOwnProperty('published_at')) {
        obj.published_at = ApiClient.convertToType(data.published_at, 'Date');
      }
      if (data.hasOwnProperty('created_by')) {
        obj.created_by = ApiClient.convertToType(data.created_by, 'String');
      }
      if (data.hasOwnProperty('updated_by')) {
        obj.updated_by = ApiClient.convertToType(data.updated_by, 'String');
      }
    }
    return obj;
  }
}

/**
 * @member {String} name
 */
NewCphate.prototype.name = undefined;

/**
 * @member {Object} structure
 */
NewCphate.prototype.structure = undefined;

/**
 * @member {Object} timepoints
 */
NewCphate.prototype.timepoints = undefined;

/**
 * @member {Date} published_at
 */
NewCphate.prototype.published_at = undefined;

/**
 * @member {String} created_by
 */
NewCphate.prototype.created_by = undefined;

/**
 * @member {String} updated_by
 */
NewCphate.prototype.updated_by = undefined;

export default NewCphate;
