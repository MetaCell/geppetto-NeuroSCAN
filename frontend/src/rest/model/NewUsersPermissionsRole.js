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
 * The NewUsersPermissionsRole model module.
 * @module model/NewUsersPermissionsRole
 * @version 1.0.0
 */
class NewUsersPermissionsRole {
    /**
     * Constructs a new <code>NewUsersPermissionsRole</code>.
     * @alias module:model/NewUsersPermissionsRole
     * @param name {String} 
     */
    constructor(name) { 
        
        NewUsersPermissionsRole.initialize(this, name);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name) { 
        obj['name'] = name;
    }

    /**
     * Constructs a <code>NewUsersPermissionsRole</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NewUsersPermissionsRole} obj Optional instance to populate.
     * @return {module:model/NewUsersPermissionsRole} The populated <code>NewUsersPermissionsRole</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new NewUsersPermissionsRole();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('permissions')) {
                obj['permissions'] = ApiClient.convertToType(data['permissions'], ['String']);
            }
            if (data.hasOwnProperty('users')) {
                obj['users'] = ApiClient.convertToType(data['users'], ['String']);
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
 * @member {String} name
 */
NewUsersPermissionsRole.prototype['name'] = undefined;

/**
 * @member {String} description
 */
NewUsersPermissionsRole.prototype['description'] = undefined;

/**
 * @member {String} type
 */
NewUsersPermissionsRole.prototype['type'] = undefined;

/**
 * @member {Array.<String>} permissions
 */
NewUsersPermissionsRole.prototype['permissions'] = undefined;

/**
 * @member {Array.<String>} users
 */
NewUsersPermissionsRole.prototype['users'] = undefined;

/**
 * @member {String} created_by
 */
NewUsersPermissionsRole.prototype['created_by'] = undefined;

/**
 * @member {String} updated_by
 */
NewUsersPermissionsRole.prototype['updated_by'] = undefined;






export default NewUsersPermissionsRole;

