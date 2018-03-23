import {FetchMode, RestModel, TFetchMode} from '../classes/index';
import {getClassName, getter} from '../helpers/index';

export interface BelongsToConfig<T = any> {
    field: string;
    route?: string;
    type: {new(...args: any[]): T};
    fetch?: TFetchMode;
    async?: boolean;
}

export function BelongsTo<T = any>(
    field: string | BelongsToConfig,
    type?: {new(...args: any[]): T},
    fetch?: TFetchMode,
    route?: string,
    async?: boolean
): any {
    let config: BelongsToConfig;
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

    const privateFieldName = `_${field}`;

    return function <T extends {new(...args: any[]): {}}>(target: T, propertyKey: string) {
        if (typeof target !== 'function') {
            throw new Error(
                'BelongsTo decorator should be applied on the class and not on the property!' +
                ` Class: ${getClassName(target)}, property: ${propertyKey}`
            );
        }

        if (!RestModel.isPrototypeOf(target)) {
            throw new Error(
                'BelongsTo decorator should be applied on a class that extends RestModel!' +
                ` But ${getClassName(target)} is not extending it.`
            );
        }

        if (!config.type) {
            throw new Error(
                `BelongsTo: The type should be specified!` +
                ` Class: ${getClassName(target)}, field: ${config.field}`
            );
        }

        return class extends target {
            get [<string>field]() {
                if (this[privateFieldName] || fetch === FetchMode.EAGER) {
                    return getter(async, this[privateFieldName]);
                }

                return this[privateFieldName] = (<any>this).lazyLoad(route);
            }

            set [<string>field](related: any) {
                this[privateFieldName] = type && related && new (<any>type)().init(related) || related;
            }
        };
    };
}
