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

import { mapValues } from '../runtime';
import type { BeansPost200ResponseBean } from './BeansPost200ResponseBean';
import {
    BeansPost200ResponseBeanFromJSON,
    BeansPost200ResponseBeanFromJSONTyped,
    BeansPost200ResponseBeanToJSON,
    BeansPost200ResponseBeanToJSONTyped,
} from './BeansPost200ResponseBean';

/**
 * 
 * @export
 * @interface BeansPost200Response
 */
export interface BeansPost200Response {
    /**
     * 
     * @type {BeansPost200ResponseBean}
     * @memberof BeansPost200Response
     */
    bean?: BeansPost200ResponseBean;
}

/**
 * Check if a given object implements the BeansPost200Response interface.
 */
export function instanceOfBeansPost200Response(value: object): value is BeansPost200Response {
    return true;
}

export function BeansPost200ResponseFromJSON(json: any): BeansPost200Response {
    return BeansPost200ResponseFromJSONTyped(json, false);
}

export function BeansPost200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): BeansPost200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'bean': json['bean'] == null ? undefined : BeansPost200ResponseBeanFromJSON(json['bean']),
    };
}

export function BeansPost200ResponseToJSON(json: any): BeansPost200Response {
    return BeansPost200ResponseToJSONTyped(json, false);
}

export function BeansPost200ResponseToJSONTyped(value?: BeansPost200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'bean': BeansPost200ResponseBeanToJSON(value['bean']),
    };
}

