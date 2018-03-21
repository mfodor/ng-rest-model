import {getClassName} from '../helpers/index';
import {RestModel} from '../service/index';

export function Parent<T extends { new(...args: any[]): {} }>(...parents: T[]): any {
    return function <T extends { new(...args: any[]): {} }>(target: T, propertyKey: string) {
        if (typeof target !== 'function') {
            throw new Error(
                'Parent decorator should be applied on the class and not on the property!' +
                ` Class: ${getClassName(target)}, property: ${propertyKey}`
            );
        }

        if (!RestModel.isPrototypeOf(target)) {
            throw new Error(
                'Parent decorator should be applied on a class that extends RestService!' +
                ` But ${getClassName(target)} is not extending it.`
            );
        }

        if (!parents || !parents.length) {
            console.warn(`No parent has been specified! Class: ${getClassName(target)}`);
            parents = [];
        }

        return class extends target {
            constructor(...args: any[]) {
                super();
                const $parents = this['$parents'];
                parents.forEach(p => {
                    if ($parents.indexOf(p) === -1) {
                        $parents.push(new p());
                    }
                });
            }
        };
    };
}
