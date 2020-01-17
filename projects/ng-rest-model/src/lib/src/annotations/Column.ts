import {RestModel} from '../classes/rest-model';
import {getClassName} from '../helpers/get-class-name';

export function Column(fieldNameOnServer: string): any {
    return function (target: any, fieldNameOnClient: string) {
        if (!RestModel.isPrototypeOf(target.constructor)) {
            throw new Error(
                'Column decorator should be applied on a class that extends RestModel!' +
                ` But ${getClassName(target)} is not extending it.`
            );
        }

        const proto = target.constructor.prototype;

        if (!proto.$mappingsFrom) {
            proto.$mappingsFrom = {};
        }

        if (!proto.$mappingsTo) {
            proto.$mappingsTo = {};
        }

        proto.$mappingsTo[fieldNameOnClient] = fieldNameOnServer;
        proto.$mappingsFrom[fieldNameOnServer] = fieldNameOnClient;
    };
}
