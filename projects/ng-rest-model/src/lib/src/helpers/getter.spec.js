"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var getter_1 = require("./getter");
require("rxjs/add/observable/of");
describe('getter', function () {
    it('should return the value if async is false', function () {
        var values = [243, 'nick', void 0, null, { property: 'prop' }, [32, 452]];
        values.forEach(function (v) { return expect(getter_1.getter(false, v)).toBe(v); });
    });
    it('should return the value if it is already an Observable', function () {
        var observable = rxjs_1.of({ property: 'prop' });
        expect(getter_1.getter(false, observable)).toBe(observable);
        expect(getter_1.getter(true, observable)).toBe(observable);
    });
    it('should return the value as an Observable if it is not already one and async is true', function () {
        var value = { property: 'prop' };
        var obs = getter_1.getter(true, value);
        expect(obs instanceof rxjs_1.Observable).toBe(true);
        expect(obs.value).toBe(value);
    });
});
//# sourceMappingURL=getter.spec.js.map