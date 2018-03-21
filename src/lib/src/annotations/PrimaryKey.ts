import {getClassName} from '../helpers/index';
import {RestService} from '../service/index';

export function PrimaryKey(): any {
    return function (target: any, fieldName: string) {
        if (!RestService.isPrototypeOf(target.constructor)) {
            throw new Error(
                'PrimaryKey decorator should be applied on a class that extends Resource!' +
                ` But ${getClassName(target)} is not extending it.`
            );
        }

        target.$primaryKey = fieldName;
    };
}
