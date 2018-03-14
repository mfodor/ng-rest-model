import {RestService} from '../service';
import {FetchMode, TFetchMode} from '../classes';
import {getClassName, getter} from '../helpers';

export interface BelongsToConfig {
    field: string;
    route?: string;
    type?: Function;
    fetch?: TFetchMode;
    async?: boolean;
}

export function BelongsTo(
    field: string | BelongsToConfig,
    type?: Function,
    route?: string,
    fetch?: TFetchMode,
    async?: boolean
): any {
    if (typeof field === 'object') {
        type = field.type;
        route = field.route || field.field;
        fetch = field.fetch || FetchMode.EAGER;
        async = fetch === FetchMode.LAZY || field.async;
        field = field.field;
    } else {
        route = route || field;
        fetch = fetch || FetchMode.EAGER;
        async = fetch === FetchMode.LAZY || async;
    }

    const privateFieldName = `_${field}`;

    return function <T extends { new(...args: any[]): {} }>(target: T, propertyKey: string) {
        if (typeof target !== 'function') {
            throw new Error(
                'BelongsTo decorator should be applied on the class and not on the property!' +
                ` Class: ${getClassName(target)}, property: ${propertyKey}`
            );
        }

        if (!RestService.isPrototypeOf(target)) {
            throw new Error(
                'BelongsTo decorator should be applied on a class that extends Resource!' +
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
                this[privateFieldName] = type && related && new (<any>type)(related) || related;
            }
        };
    };
}
