import {RestModel} from '../classes/index';
import {getClassName} from '../helpers/index';

export function Column(fieldNameOnServer: string): any {
    return function (target: any, fieldNameOnClient: string) {
        if (!RestModel.isPrototypeOf(target.constructor)) {
            throw new Error(
                'Column decorator should be applied on a class that extends RestModel!' +
                ` But ${getClassName(target)} is not extending it.`
            );
        }

        const proto = target.constructor.prototype;

        if (!proto.$mappings) {
            proto.$mappings = {};
        }

        proto.$mappings[fieldNameOnClient] = fieldNameOnServer;
        proto.$mappings[fieldNameOnServer] = fieldNameOnClient;
    };
}
