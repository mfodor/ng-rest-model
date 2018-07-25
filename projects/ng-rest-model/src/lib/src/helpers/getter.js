"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/internal/Observable");
var of_1 = require("rxjs/internal/observable/of");
function getter(async, value) {
    if (!async || value instanceof Observable_1.Observable) {
        return value;
    }
    return of_1.of(value);
}
exports.getter = getter;
//# sourceMappingURL=getter.js.map