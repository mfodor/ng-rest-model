"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../classes/index");
var index_2 = require("../helpers/index");
function PrimaryKey() {
    return function (target, fieldName) {
        if (!index_1.RestModel.isPrototypeOf(target.constructor)) {
            throw new Error('PrimaryKey decorator should be applied on a class that extends RestModel!' +
                (" But " + index_2.getClassName(target) + " is not extending it."));
        }
        target.$primaryKey = fieldName;
    };
}
exports.PrimaryKey = PrimaryKey;
//# sourceMappingURL=PrimaryKey.js.map