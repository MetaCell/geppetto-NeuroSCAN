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
 * The NewNeuron model module.
 * @module model/NewNeuron
 * @version 1.0.0
 */
class NewNeuron {
    /**
     * Constructs a new <code>NewNeuron</code>.
     * @alias module:model/NewNeuron
     * @param uid {String} 
     */
    constructor(uid) { 
        
        NewNeuron.initialize(this, uid);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, uid) { 
        obj['uid'] = uid;
    }

    /**
     * Constructs a <code>NewNeuron</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NewNeuron} obj Optional instance to populate.
     * @return {module:model/NewNeuron} The populated <code>NewNeuron</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new NewNeuron();

            if (data.hasOwnProperty('metadata')) {
                obj['metadata'] = ApiClient.convertToType(data['metadata'], 'String');
            }
            if (data.hasOwnProperty('wormatlas')) {
                obj['wormatlas'] = ApiClient.convertToType(data['wormatlas'], 'String');
            }
            if (data.hasOwnProperty('uid')) {
                obj['uid'] = ApiClient.convertToType(data['uid'], 'String');
            }
            if (data.hasOwnProperty('timepoints')) {
                obj['timepoints'] = ApiClient.convertToType(data['timepoints'], ['Number']);
            }
            if (data.hasOwnProperty('embryonic')) {
                obj['embryonic'] = ApiClient.convertToType(data['embryonic'], 'Boolean');
            }
            if (data.hasOwnProperty('lineage')) {
                obj['lineage'] = ApiClient.convertToType(data['lineage'], 'String');
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('published_at')) {
                obj['published_at'] = ApiClient.convertToType(data['published_at'], 'Date');
            }
            if (data.hasOwnProperty('created_by')) {
                obj['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
            }
            if (data.hasOwnProperty('updated_by')) {
                obj['updated_by'] = ApiClient.convertToType(data['updated_by'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} metadata
 */
NewNeuron.prototype['metadata'] = undefined;

/**
 * @member {String} wormatlas
 */
NewNeuron.prototype['wormatlas'] = undefined;

/**
 * @member {String} uid
 */
NewNeuron.prototype['uid'] = undefined;

/**
 * @member {Array.<Number>} timepoints
 */
NewNeuron.prototype['timepoints'] = undefined;

/**
 * @member {Boolean} embryonic
 */
NewNeuron.prototype['embryonic'] = undefined;

/**
 * @member {String} lineage
 */
NewNeuron.prototype['lineage'] = undefined;

/**
 * @member {String} location
 */
NewNeuron.prototype['location'] = undefined;

/**
 * @member {Date} published_at
 */
NewNeuron.prototype['published_at'] = undefined;

/**
 * @member {String} created_by
 */
NewNeuron.prototype['created_by'] = undefined;

/**
 * @member {String} updated_by
 */
NewNeuron.prototype['updated_by'] = undefined;






export default NewNeuron;

