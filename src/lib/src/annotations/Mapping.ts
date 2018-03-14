import {getClassName} from '../helpers';
import {RestService} from '../service';

export function Mapping(fieldNameOnServer: string): any {
    return function (target: any, fieldNameOnClient: string) {
        if (!RestService.isPrototypeOf(target.constructor)) {
            throw new Error(
                'Mapping decorator should be applied on a class that extends Resource!' +
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
