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


import * as runtime from '../runtime';
import {
    NewPromoter,
    NewPromoterFromJSON,
    NewPromoterToJSON,
    Promoter,
    PromoterFromJSON,
    PromoterToJSON,
} from '../models';

export interface PromotersGetRequest {
    limit?: number;
    sort?: string;
    start?: number;
    eq?: string;
    ne?: string;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    containss?: string;
    _in?: Array<string>;
    nin?: Array<string>;
}

export interface PromotersIdDeleteRequest {
    id: string;
}

export interface PromotersIdGetRequest {
    id: string;
}

export interface PromotersIdPutRequest {
    id: string;
    newPromoter: NewPromoter;
}

export interface PromotersPostRequest {
    newPromoter: NewPromoter;
}

/**
 * 
 */
export class PromoterApi extends runtime.BaseAPI {

    /**
     */
    async promotersCountGetRaw(): Promise<runtime.ApiResponse<object>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/promoters/count`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async promotersCountGet(): Promise<object> {
        const response = await this.promotersCountGetRaw();
        return await response.value();
    }

    /**
     */
    async promotersGetRaw(requestParameters: PromotersGetRequest): Promise<runtime.ApiResponse<Array<Promoter>>> {
        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['_limit'] = requestParameters.limit;
        }

        if (requestParameters.sort !== undefined) {
            queryParameters['_sort'] = requestParameters.sort;
        }

        if (requestParameters.start !== undefined) {
            queryParameters['_start'] = requestParameters.start;
        }

        if (requestParameters.eq !== undefined) {
            queryParameters['_eq'] = requestParameters.eq;
        }

        if (requestParameters.ne !== undefined) {
            queryParameters['_ne'] = requestParameters.ne;
        }

        if (requestParameters.lt !== undefined) {
            queryParameters['_lt'] = requestParameters.lt;
        }

        if (requestParameters.lte !== undefined) {
            queryParameters['_lte'] = requestParameters.lte;
        }

        if (requestParameters.gt !== undefined) {
            queryParameters['_gt'] = requestParameters.gt;
        }

        if (requestParameters.gte !== undefined) {
            queryParameters['_gte'] = requestParameters.gte;
        }

        if (requestParameters.contains !== undefined) {
            queryParameters['_contains'] = requestParameters.contains;
        }

        if (requestParameters.containss !== undefined) {
            queryParameters['_containss'] = requestParameters.containss;
        }

        if (requestParameters._in) {
            queryParameters['_in'] = requestParameters._in;
        }

        if (requestParameters.nin) {
            queryParameters['_nin'] = requestParameters.nin;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/promoters`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PromoterFromJSON));
    }

    /**
     */
    async promotersGet(requestParameters: PromotersGetRequest): Promise<Array<Promoter>> {
        const response = await this.promotersGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete a record
     */
    async promotersIdDeleteRaw(requestParameters: PromotersIdDeleteRequest): Promise<runtime.ApiResponse<number>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling promotersIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/promoters/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Delete a record
     */
    async promotersIdDelete(requestParameters: PromotersIdDeleteRequest): Promise<number> {
        const response = await this.promotersIdDeleteRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async promotersIdGetRaw(requestParameters: PromotersIdGetRequest): Promise<runtime.ApiResponse<Promoter>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling promotersIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/promoters/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PromoterFromJSON(jsonValue));
    }

    /**
     */
    async promotersIdGet(requestParameters: PromotersIdGetRequest): Promise<Promoter> {
        const response = await this.promotersIdGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update a record
     */
    async promotersIdPutRaw(requestParameters: PromotersIdPutRequest): Promise<runtime.ApiResponse<Promoter>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling promotersIdPut.');
        }

        if (requestParameters.newPromoter === null || requestParameters.newPromoter === undefined) {
            throw new runtime.RequiredError('newPromoter','Required parameter requestParameters.newPromoter was null or undefined when calling promotersIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/promoters/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: NewPromoterToJSON(requestParameters.newPromoter),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PromoterFromJSON(jsonValue));
    }

    /**
     * Update a record
     */
    async promotersIdPut(requestParameters: PromotersIdPutRequest): Promise<Promoter> {
        const response = await this.promotersIdPutRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create a new record
     */
    async promotersPostRaw(requestParameters: PromotersPostRequest): Promise<runtime.ApiResponse<Promoter>> {
        if (requestParameters.newPromoter === null || requestParameters.newPromoter === undefined) {
            throw new runtime.RequiredError('newPromoter','Required parameter requestParameters.newPromoter was null or undefined when calling promotersPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/promoters`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NewPromoterToJSON(requestParameters.newPromoter),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PromoterFromJSON(jsonValue));
    }

    /**
     * Create a new record
     */
    async promotersPost(requestParameters: PromotersPostRequest): Promise<Promoter> {
        const response = await this.promotersPostRaw(requestParameters);
        return await response.value();
    }

}
