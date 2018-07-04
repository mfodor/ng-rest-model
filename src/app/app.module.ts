import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgRestModelModule} from '../../projects/ng-rest-model/src/lib/ng-rest-model.module';

import {AppComponent} from './app.component';
import {Denomination} from './Denomination';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgRestModelModule.forRoot({
            baseUrl: 'http://localhost:5656/api'
        }),
    ],
    providers: [Denomination],
    bootstrap: [AppComponent]
})
export class AppModule {
    // constructor(
    //     @Inject(NgRestModelService) restService: NgRestModelService,
    //     @Inject(HttpClient) http: HttpClient,
    // ) {
    //     restService.configure({
    //         baseUrl: 'http://localhost:8000/api',
    //         http
    //     });
    //     console.log('configured', restService);
    // }
}
