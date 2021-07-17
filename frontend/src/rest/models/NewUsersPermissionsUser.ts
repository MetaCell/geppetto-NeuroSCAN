/* tslint:disable */
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
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface NewUsersPermissionsUser
 */
export interface NewUsersPermissionsUser {
    /**
     * 
     * @type {string}
     * @memberof NewUsersPermissionsUser
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof NewUsersPermissionsUser
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof NewUsersPermissionsUser
     */
    provider?: string;
    /**
     * 
     * @type {string}
     * @memberof NewUsersPermissionsUser
     */
    password?: string;
    /**
     * 
     * @type {string}
     * @memberof NewUsersPermissionsUser
     */
    resetPasswordToken?: string;
    /**
     * 
     * @type {string}
     * @memberof NewUsersPermissionsUser
     */
    confirmationToken?: string;
    /**
     * 
     * @type {boolean}
     * @memberof NewUsersPermissionsUser
     */
    confirmed?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof NewUsersPermissionsUser
     */
    blocked?: boolean;
    /**
     * 
     * @type {string}
     * @memberof NewUsersPermissionsUser
     */
    role?: string;
    /**
     * 
     * @type {string}
     * @memberof NewUsersPermissionsUser
     */
    createdBy?: string;
    /**
     * 
     * @type {string}
     * @memberof NewUsersPermissionsUser
     */
    updatedBy?: string;
}

export function NewUsersPermissionsUserFromJSON(json: any): NewUsersPermissionsUser {
    return NewUsersPermissionsUserFromJSONTyped(json, false);
}

export function NewUsersPermissionsUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): NewUsersPermissionsUser {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': json['username'],
        'email': json['email'],
        'provider': !exists(json, 'provider') ? undefined : json['provider'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'resetPasswordToken': !exists(json, 'resetPasswordToken') ? undefined : json['resetPasswordToken'],
        'confirmationToken': !exists(json, 'confirmationToken') ? undefined : json['confirmationToken'],
        'confirmed': !exists(json, 'confirmed') ? undefined : json['confirmed'],
        'blocked': !exists(json, 'blocked') ? undefined : json['blocked'],
        'role': !exists(json, 'role') ? undefined : json['role'],
        'createdBy': !exists(json, 'created_by') ? undefined : json['created_by'],
        'updatedBy': !exists(json, 'updated_by') ? undefined : json['updated_by'],
    };
}

export function NewUsersPermissionsUserToJSON(value?: NewUsersPermissionsUser | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
        'email': value.email,
        'provider': value.provider,
        'password': value.password,
        'resetPasswordToken': value.resetPasswordToken,
        'confirmationToken': value.confirmationToken,
        'confirmed': value.confirmed,
        'blocked': value.blocked,
        'role': value.role,
        'created_by': value.createdBy,
        'updated_by': value.updatedBy,
    };
}


