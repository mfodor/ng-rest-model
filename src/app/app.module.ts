import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgRestModelModule} from 'ng-rest-model';

import {AppComponent} from './app.component';
import {User} from './User';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgRestModelModule.forRoot({
            baseUrl: 'https://jsonplaceholder.typicode.com'
        }),
    ],
    providers: [User],
    bootstrap: [AppComponent]
})
export class AppModule {
}
