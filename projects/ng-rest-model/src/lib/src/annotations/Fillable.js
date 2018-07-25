"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../classes/index");
var index_2 = require("../helpers/index");
function Fillable() {
    return function (target, fieldName) {
        if (!index_1.RestModel.isPrototypeOf(target.constructor)) {
            throw new Error('Protected decorator should be applied on a class that extends RestModel!' +
                (" But " + index_2.getClassName(target) + " is not extending it."));
        }
        if (!target.$fillable) {
            target.$fillable = [fieldName];
        }
        else if (target.$fillable.indexOf(fieldName) === -1) {
            target.$fillable.push(fieldName);
        }
    };
}
exports.Fillable = Fillable;
//# sourceMappingURL=Fillable.js.map