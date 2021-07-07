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
 * @interface NewContact
 */
export interface NewContact {
    /**
     * 
     * @type {string}
     * @memberof NewContact
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof NewContact
     */
    neuronA?: string;
    /**
     * 
     * @type {string}
     * @memberof NewContact
     */
    neuronB?: string;
    /**
     * 
     * @type {string}
     * @memberof NewContact
     */
    metadata?: string;
    /**
     * 
     * @type {Date}
     * @memberof NewContact
     */
    publishedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof NewContact
     */
    createdBy?: string;
    /**
     * 
     * @type {string}
     * @memberof NewContact
     */
    updatedBy?: string;
}

export function NewContactFromJSON(json: any): NewContact {
    return NewContactFromJSONTyped(json, false);
}

export function NewContactFromJSONTyped(json: any, ignoreDiscriminator: boolean): NewContact {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'neuronA': !exists(json, 'neuronA') ? undefined : json['neuronA'],
        'neuronB': !exists(json, 'neuronB') ? undefined : json['neuronB'],
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'publishedAt': !exists(json, 'published_at') ? undefined : (new Date(json['published_at'])),
        'createdBy': !exists(json, 'created_by') ? undefined : json['created_by'],
        'updatedBy': !exists(json, 'updated_by') ? undefined : json['updated_by'],
    };
}

export function NewContactToJSON(value?: NewContact | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'neuronA': value.neuronA,
        'neuronB': value.neuronB,
        'metadata': value.metadata,
        'published_at': value.publishedAt === undefined ? undefined : (value.publishedAt.toISOString()),
        'created_by': value.createdBy,
        'updated_by': value.updatedBy,
    };
}


