import {HttpClientModule} from '@angular/common/http';
import {Inject, ModuleWithProviders, NgModule, Optional} from '@angular/core';
import {NG_REST_MODEL_OPTIONS} from './ng-rest-model.token';
import {INgRestModelConfig, NgRestModelConfig} from './service/ng-rest-model-config';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [
        HttpClientModule
    ],
    providers: []
})
export class NgRestModelModule {

    static forRoot(options: INgRestModelConfig): ModuleWithProviders {
        return {
            ngModule: NgRestModelModule,
            providers: [
                NgRestModelConfig,
                {
                    provide: NG_REST_MODEL_OPTIONS,
                    useValue: options
                }
            ]
        };
    }

    constructor(config: NgRestModelConfig, @Optional() @Inject(NG_REST_MODEL_OPTIONS) options: INgRestModelConfig) {
        if (!options) {
            options = {baseUrl: ''};
        }
        config.configure(options);
    }
}
