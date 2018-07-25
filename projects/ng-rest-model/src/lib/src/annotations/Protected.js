"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../classes/index");
var index_2 = require("../helpers/index");
function Protected() {
    return function (target, fieldName) {
        if (!index_1.RestModel.isPrototypeOf(target.constructor)) {
            throw new Error('Protected decorator should be applied on a class that extends RestModel!' +
                (" But " + index_2.getClassName(target) + " is not extending it."));
        }
        if (!target.$protected) {
            target.$protected = [fieldName];
        }
        else if (target.$protected.indexOf(fieldName) === -1) {
            target.$protected.push(fieldName);
        }
    };
}
exports.Protected = Protected;
//# sourceMappingURL=Protected.js.map