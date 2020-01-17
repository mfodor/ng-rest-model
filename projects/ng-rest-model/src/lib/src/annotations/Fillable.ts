import {RestModel} from '../classes/rest-model';
import {getClassName} from '../helpers/get-class-name';

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
