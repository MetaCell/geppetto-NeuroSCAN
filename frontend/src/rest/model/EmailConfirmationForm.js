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
 * The EmailConfirmationForm model module.
 * @module model/EmailConfirmationForm
 * @version 1.0.0
 */
class EmailConfirmationForm {
    /**
     * Constructs a new <code>EmailConfirmationForm</code>.
     * @alias module:model/EmailConfirmationForm
     * @param email {String} 
     */
    constructor(email) { 
        
        EmailConfirmationForm.initialize(this, email);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, email) { 
        obj['email'] = email;
    }

    /**
     * Constructs a <code>EmailConfirmationForm</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EmailConfirmationForm} obj Optional instance to populate.
     * @return {module:model/EmailConfirmationForm} The populated <code>EmailConfirmationForm</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new EmailConfirmationForm();

            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} email
 */
EmailConfirmationForm.prototype['email'] = undefined;






export default EmailConfirmationForm;
