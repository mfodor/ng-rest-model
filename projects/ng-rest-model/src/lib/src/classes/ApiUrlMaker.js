"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiUrlMaker = /** @class */ (function () {
    function ApiUrlMaker(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ''; }
        this._parts = [baseUrl];
        this._query = [];
    }
    ApiUrlMaker.prototype.one = function (collection, element) {
        this.addPart(collection);
        return this.addPart(element);
    };
    ApiUrlMaker.prototype.all = function (collection) {
        return this.addPart(collection);
    };
    ApiUrlMaker.prototype.addPart = function (part) {
        if (!this.isValidArgument(part)) {
            console.error('Trying to add invalid argument: ', part);
            throw new Error('InvalidArgumentException');
        }
        this._parts.push('' + part);
        return this;
    };
    ApiUrlMaker.prototype.params = function (params) {
        if (!params) {
            return this;
        }
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                this.param(key, params[key]);
            }
        }
        return this;
    };
    ApiUrlMaker.prototype.param = function (key, value) {
        if (key && (typeof key === 'string' || typeof key === 'number')) {
            this._query.push(key + "=" + value);
        }
        return this;
    };
    ApiUrlMaker.prototype.build = function () {
        var parts = [this._parts.join('/')];
        if (this._query.length) {
            parts.push(this._query.join('&'));
        }
        return parts.join('?');
    };
    ApiUrlMaker.prototype.isValidArgument = function (arg) {
        return (typeof arg === 'string' && arg !== '') ||
            (typeof arg === 'number' && !isNaN(arg));
    };
    ApiUrlMaker.prototype.toString = function () {
        return this.build();
    };
    return ApiUrlMaker;
}());
exports.ApiUrlMaker = ApiUrlMaker;
//# sourceMappingURL=ApiUrlMaker.js.map