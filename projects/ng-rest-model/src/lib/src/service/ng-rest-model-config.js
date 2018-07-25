"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ngRestModelConfigStore = {
    http: null,
    baseUrl: ''
};
function ngRestModelHttp() {
    return ngRestModelConfigStore.http;
}
exports.ngRestModelHttp = ngRestModelHttp;
function ngRestModelBaseUrl() {
    return ngRestModelConfigStore.baseUrl;
}
exports.ngRestModelBaseUrl = ngRestModelBaseUrl;
var NgRestModelConfig = /** @class */ (function () {
    function NgRestModelConfig() {
    }
    Object.defineProperty(NgRestModelConfig.prototype, "baseUrl", {
        get: function () {
            return ngRestModelBaseUrl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRestModelConfig.prototype, "http", {
        get: function () {
            return ngRestModelHttp();
        },
        enumerable: true,
        configurable: true
    });
    NgRestModelConfig.prototype.configure = function (options) {
        ngRestModelConfigStore.baseUrl = options && options.baseUrl || '';
        ngRestModelConfigStore.http = options && options.http;
    };
    NgRestModelConfig = __decorate([
        core_1.Injectable()
    ], NgRestModelConfig);
    return NgRestModelConfig;
}());
exports.NgRestModelConfig = NgRestModelConfig;
//# sourceMappingURL=ng-rest-model-config.js.map