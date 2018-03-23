import { TestBed, inject } from '@angular/core/testing';

import { NgRestModelConfig } from './ng-rest-model-config';

describe('NgRestModelConfig', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NgRestModelConfig]
        });
    });

    beforeEach(inject([NgRestModelConfig], (service: NgRestModelConfig) => {
        service.configure({baseUrl: null, http: null});
    }));

    it('should create service', inject([NgRestModelConfig], (service: NgRestModelConfig) => {
        expect(service).toBeTruthy();
    }));

    it('should configure with default options', inject([NgRestModelConfig], (service: NgRestModelConfig) => {
        const baseUrlBefore = service.baseUrl;
        service.configure(void 0);

        expect(service.baseUrl).toBe(baseUrlBefore);
        expect(NgRestModelConfig.BASE_URL).toBe(baseUrlBefore);

        expect(service.http).toBe(void 0);
        expect(NgRestModelConfig.HTTP).toBe(void 0);
    }));

    it('should configure with given options', inject([NgRestModelConfig], (service: NgRestModelConfig) => {
        const host = 'host:8080/api';
        const fakeHttp = {fake: true};
        service.configure({
            baseUrl: host,
            http: <any>fakeHttp
        });

        expect(service.baseUrl).toBe(host);
        expect(NgRestModelConfig.BASE_URL).toBe(host);

        expect(service.http).toBe(fakeHttp);
        expect(NgRestModelConfig.HTTP).toBe(fakeHttp);
    }));
});
