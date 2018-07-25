"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var ng_rest_model_config_1 = require("./ng-rest-model-config");
describe('NgRestModelConfig', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [ng_rest_model_config_1.NgRestModelConfig]
        });
    });
    beforeEach(testing_1.inject([ng_rest_model_config_1.NgRestModelConfig], function (service) {
        service.configure({ baseUrl: null, http: null });
    }));
    it('should create service', testing_1.inject([ng_rest_model_config_1.NgRestModelConfig], function (service) {
        expect(service).toBeTruthy();
    }));
    it('should configure with default options', testing_1.inject([ng_rest_model_config_1.NgRestModelConfig], function (service) {
        var baseUrlBefore = service.baseUrl;
        service.configure(void 0);
        expect(service.baseUrl).toBe(baseUrlBefore);
        expect(service.http).toBe(void 0);
    }));
    it('should configure with given options', testing_1.inject([ng_rest_model_config_1.NgRestModelConfig], function (service) {
        var host = 'host:8080/api';
        var fakeHttp = { fake: true };
        service.configure({
            baseUrl: host,
            http: fakeHttp
        });
        expect(service.baseUrl).toBe(host);
        expect(service.http).toBe(fakeHttp);
    }));
});
//# sourceMappingURL=ng-rest-model-config.spec.js.map