import {NgModule} from '@angular/core';
import {NgRestModelComponent} from './ng-rest-model.component';
import {NgRestModelConfig} from './src/service';

@NgModule({
    imports: [],
    declarations: [NgRestModelComponent],
    exports: [NgRestModelComponent],
    providers: [
        NgRestModelConfig
    ]
})
export class NgRestModelModule {}

