import { TestBed, inject } from '@angular/core/testing';

import { NgRestModelConfig } from './ng-rest-model-config';

describe('NgRestModelConfig', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NgRestModelConfig]
        });
    });

    it('should create service', inject([NgRestModelConfig], (service: NgRestModelConfig) => {
        expect(service).toBeTruthy();
    }));

    it('should configure with default options', inject([NgRestModelConfig], (service: NgRestModelConfig) => {
        const baseUrlBefore = service.baseUrl;
        service.configure(void 0);
        expect(service.baseUrl).toBe(baseUrlBefore);
    }));

    it('should configure with given options', inject([NgRestModelConfig], (service: NgRestModelConfig) => {
        const host = 'host:8080/api';
        service.configure({
            baseUrl: host,
            http: <any>{}
        });
        expect(service.baseUrl).toBe(host);
    }));
});
