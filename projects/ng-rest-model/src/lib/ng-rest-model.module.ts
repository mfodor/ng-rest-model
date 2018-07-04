import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {INgRestModelConfig, NgRestModelConfig, NgRestModelService} from './src/service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [NgRestModelService]
})
export class NgRestModelModule {
    static forRoot(config: INgRestModelConfig): ModuleWithProviders {
        console.log('forRoot got ', config);
        return {
            ngModule: NgRestModelModule,
            providers: [
                {provide: NgRestModelConfig, useValue: config}
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
