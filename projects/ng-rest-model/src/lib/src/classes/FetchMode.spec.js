"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FetchMode_1 = require("./FetchMode");
describe('FetchMode', function () {
    it('values should not be changed', function () {
        expect(FetchMode_1.FetchMode.LAZY).toBe('lazy');
        expect(FetchMode_1.FetchMode.EAGER).toBe('eager');
    });
});
//# sourceMappingURL=FetchMode.spec.js.map