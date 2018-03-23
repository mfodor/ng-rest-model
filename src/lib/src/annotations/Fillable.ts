import {RestModel} from '../classes/index';
import {getClassName} from '../helpers/index';

export function Fillable(): any {
    return function (target: any, fieldName: string) {
        if (!RestModel.isPrototypeOf(target.constructor)) {
            throw new Error(
                'Protected decorator should be applied on a class that extends RestModel!' +
                ` But ${getClassName(target)} is not extending it.`
            );
        }

        if (!target.$fillable) {
            target.$fillable = [fieldName];
        } else if (target.$fillable.indexOf(fieldName) === -1) {
            target.$fillable.push(fieldName);
        }
    };
}
