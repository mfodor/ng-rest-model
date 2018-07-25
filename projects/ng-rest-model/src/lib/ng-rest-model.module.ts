import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {NG_REST_MODEL_OPTIONS} from './src/ng-rest-model.token';
import {NgRestModelService} from './src/service/ng-rest-model.service';

export interface NgRestModelOptions {
    baseUrl?: string;
}

@NgModule()
export class NgRestModelModule {
    static forRoot(config: NgRestModelOptions): ModuleWithProviders {
        return {
            ngModule: NgRestModelModule,
            providers: [
                {
                    provide: NG_REST_MODEL_OPTIONS,
                    useValue: config
                },
                NgRestModelService
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: NgRestModelModule) {
        if (parentModule) {
            throw new Error(
                'NgRestModelModule is already loaded. Import it in the AppModule only');
        }
    }
}
