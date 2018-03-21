import {getClassName} from '../helpers/index';
import {RestService} from '../service/index';

export function Protected(): any {
    return function (target: any, fieldName: string) {
        if (!RestService.isPrototypeOf(target.constructor)) {
            throw new Error(
                'Protected decorator should be applied on a class that extends Resource!' +
                ` But ${getClassName(target)} is not extending it.`
            );
        }

        if (!target.$protected) {
            target.$protected = [fieldName];
        } else if (target.$protected.indexOf(fieldName) === -1) {
            target.$protected.push(fieldName);
        }
    };
}
