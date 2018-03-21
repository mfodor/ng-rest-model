import {getClassName} from '../helpers/index';
import {RestService} from '../service/index';

export function Column(fieldNameOnServer: string): any {
    return function (target: any, fieldNameOnClient: string) {
        if (!RestService.isPrototypeOf(target.constructor)) {
            throw new Error(
                'Column decorator should be applied on a class that extends RestService!' +
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
