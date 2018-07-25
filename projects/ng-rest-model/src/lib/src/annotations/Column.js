"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../classes/index");
var index_2 = require("../helpers/index");
function Column(fieldNameOnServer) {
    return function (target, fieldNameOnClient) {
        if (!index_1.RestModel.isPrototypeOf(target.constructor)) {
            throw new Error('Column decorator should be applied on a class that extends RestModel!' +
                (" But " + index_2.getClassName(target) + " is not extending it."));
        }
        var proto = target.constructor.prototype;
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
exports.Column = Column;
//# sourceMappingURL=Column.js.map