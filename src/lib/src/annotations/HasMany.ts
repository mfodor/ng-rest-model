import {HasManyHandler} from '../classes/HasManyHandler';
import {FetchMode, TFetchMode} from '../classes/index';
import {RestModel} from '../service/index';
import {getClassName} from '../helpers/index';

export interface HasManyConfig<T = any> {
    field: string;
    route?: string;
    type?: {new(...args: any[]): T};
    fetch?: TFetchMode;
    async?: boolean;
}

export function HasMany<T = any>(
    field: string | HasManyConfig,
    type?: {new(...args: any[]): T},
    route?: string,
    fetch?: TFetchMode,
    async?: boolean
): any {
    let config: HasManyConfig;
    if (typeof field === 'object') {
        config = {
            type: field.type,
            route: field.route || field.field,
            fetch: field.fetch || FetchMode.LAZY,
            async: !!field.async,
            field: field.field
        };
    } else {
        config = {
            route: route || field,
            fetch: fetch || FetchMode.LAZY,
            async: !!async,
            type: type,
            field: field
        };
    }
    config.async = config.fetch === FetchMode.LAZY || config.async;

    return function <T extends {new(...args: any[]): {}}>(target: T, propertyKey: string) {
        if (typeof target !== 'function') {
            throw new Error(
                'HasMany decorator should be applied on the class and not on the property!' +
                ` Class: ${getClassName(target)}, property: ${propertyKey}`
            );
        }

        if (!RestModel.isPrototypeOf(target)) {
            throw new Error(
                'HasMany decorator should be applied on a class that extends RestService!' +
                ` But ${getClassName(target)} is not extending it.`
            );
        }

        return class extends target {
            get [<string>field]() {
                return this['$hasMany'][<string>field].list;
            }

            set [<string>field](items: any[]) {
                this['$hasMany'][<string>field].setList(items);
            }

            constructor(...args: any[]) {
                super(...args);
                const $hasMany = this['$hasMany'];
                $hasMany[<string>field] = new HasManyHandler(<any>this, config);
            }
        };
    };
}
