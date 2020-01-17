import {RestModel} from '../classes/rest-model';
import {getClassName} from '../helpers/get-class-name';

export function Protected(): any {
    return function (target: any, fieldName: string) {
        if (!RestModel.isPrototypeOf(target.constructor)) {
            throw new Error(
                'Protected decorator should be applied on a class that extends RestModel!' +
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
