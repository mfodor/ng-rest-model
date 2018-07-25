import {RestModel} from '../classes/index';
import {getClassName} from '../helpers/index';

export function PrimaryKey(): any {
    return function (target: any, fieldName: string) {
        if (!RestModel.isPrototypeOf(target.constructor)) {
            throw new Error(
                'PrimaryKey decorator should be applied on a class that extends RestModel!' +
                ` But ${getClassName(target)} is not extending it.`
            );
        }

        target.$primaryKey = fieldName;
    };
}
