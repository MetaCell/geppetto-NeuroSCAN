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

import ApiClient from '../ApiClient';

/**
 * The DevelopmentalStage model module.
 * @module model/DevelopmentalStage
 * @version 1.0.0
 */
class DevelopmentalStage {
    /**
     * Constructs a new <code>DevelopmentalStage</code>.
     * @alias module:model/DevelopmentalStage
     * @param id {String} 
     * @param uid {String} 
     */
    constructor(id, uid) { 
        
        DevelopmentalStage.initialize(this, id, uid);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, uid) { 
        obj['id'] = id;
        obj['uid'] = uid;
    }

    /**
     * Constructs a <code>DevelopmentalStage</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DevelopmentalStage} obj Optional instance to populate.
     * @return {module:model/DevelopmentalStage} The populated <code>DevelopmentalStage</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DevelopmentalStage();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('uid')) {
                obj['uid'] = ApiClient.convertToType(data['uid'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('begin')) {
                obj['begin'] = ApiClient.convertToType(data['begin'], 'Number');
            }
            if (data.hasOwnProperty('end')) {
                obj['end'] = ApiClient.convertToType(data['end'], 'Number');
            }
            if (data.hasOwnProperty('order')) {
                obj['order'] = ApiClient.convertToType(data['order'], 'Number');
            }
            if (data.hasOwnProperty('timepoints')) {
                obj['timepoints'] = ApiClient.convertToType(data['timepoints'], ['Number']);
            }
            if (data.hasOwnProperty('promoterDB')) {
                obj['promoterDB'] = ApiClient.convertToType(data['promoterDB'], 'Boolean');
            }
            if (data.hasOwnProperty('published_at')) {
                obj['published_at'] = ApiClient.convertToType(data['published_at'], 'Date');
            }
        }
        return obj;
    }


}

/**
 * @member {String} id
 */
DevelopmentalStage.prototype['id'] = undefined;

/**
 * @member {String} uid
 */
DevelopmentalStage.prototype['uid'] = undefined;

/**
 * @member {String} name
 */
DevelopmentalStage.prototype['name'] = undefined;

/**
 * @member {Number} begin
 */
DevelopmentalStage.prototype['begin'] = undefined;

/**
 * @member {Number} end
 */
DevelopmentalStage.prototype['end'] = undefined;

/**
 * @member {Number} order
 */
DevelopmentalStage.prototype['order'] = undefined;

/**
 * @member {Array.<Number>} timepoints
 */
DevelopmentalStage.prototype['timepoints'] = undefined;

/**
 * @member {Boolean} promoterDB
 */
DevelopmentalStage.prototype['promoterDB'] = undefined;

/**
 * @member {Date} published_at
 */
DevelopmentalStage.prototype['published_at'] = undefined;






export default DevelopmentalStage;

