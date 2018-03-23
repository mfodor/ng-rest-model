import {FetchMode, RestModel, TFetchMode} from '../classes/index';
import {getClassName, getter} from '../helpers/index';

export interface BelongsToConfig<T = any> {
    field: string;
    route?: string;
    type?: {new(...args: any[]): T};
    fetch?: TFetchMode;
    async?: boolean;
}

export function BelongsTo<T = any>(
    field: string | BelongsToConfig,
    type?: {new(...args: any[]): T},
    route?: string,
    fetch?: TFetchMode,
    async?: boolean
): any {
    if (typeof field === 'object') {
        type = field.type;
        route = field.route || field.field;
        fetch = field.fetch || FetchMode.LAZY;
        async = fetch === FetchMode.LAZY || !!field.async;
        field = field.field;
    } else {
        route = route || field;
        fetch = fetch || FetchMode.LAZY;
        async = fetch === FetchMode.LAZY || !!async;
    }

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
