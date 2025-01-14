/* tslint:disable */
/* eslint-disable */
/**
 * Coffee Addiction API
 * Coffee Addiction API swagger documentation
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  BeansGet200Response,
  BeansGet500Response,
  BeansPost200Response,
  BeansPostRequest,
} from '../models/index';
import {
    BeansGet200ResponseFromJSON,
    BeansGet200ResponseToJSON,
    BeansGet500ResponseFromJSON,
    BeansGet500ResponseToJSON,
    BeansPost200ResponseFromJSON,
    BeansPost200ResponseToJSON,
    BeansPostRequestFromJSON,
    BeansPostRequestToJSON,
} from '../models/index';

export interface BeansPostOperationRequest {
    beansPostRequest: BeansPostRequest;
}

/**
 * 
 */
export class CoffeeBeansApi extends runtime.BaseAPI {

    /**
     * Retrieves a list of coffee beans from the database
     * Returns list of coffee beans
     */
    async beansGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BeansGet200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/beans`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BeansGet200ResponseFromJSON(jsonValue));
    }

    /**
     * Retrieves a list of coffee beans from the database
     * Returns list of coffee beans
     */
    async beansGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BeansGet200Response> {
        const response = await this.beansGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates a new bean in the database
     * Creates a new bean
     */
    async beansPostRaw(requestParameters: BeansPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BeansPost200Response>> {
        if (requestParameters['beansPostRequest'] == null) {
            throw new runtime.RequiredError(
                'beansPostRequest',
                'Required parameter "beansPostRequest" was null or undefined when calling beansPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/beans`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BeansPostRequestToJSON(requestParameters['beansPostRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BeansPost200ResponseFromJSON(jsonValue));
    }

    /**
     * Creates a new bean in the database
     * Creates a new bean
     */
    async beansPost(requestParameters: BeansPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BeansPost200Response> {
        const response = await this.beansPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
