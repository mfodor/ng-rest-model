import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Inject, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgRestModelConfig, NgRestModelModule} from 'ng-rest-model';
import {AppComponent} from './app.component';
import {AlbumComponent} from './codes/album.component';
import {AppComponentHtmlComponent} from './codes/app-component-html.component';
import {AppComponentComponent} from './codes/app-component.component';
import {AppModuleComponent} from './codes/app-module.component';
import {CodesComponent} from './codes/codes.component';
import {UserComponent} from './codes/user.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        NgRestModelModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        CodesComponent,
        AppComponentComponent,
        AppComponentHtmlComponent,
        AppModuleComponent,
        AlbumComponent,
        UserComponent
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
    constructor(
        @Inject(NgRestModelConfig) config: NgRestModelConfig,
        @Inject(HttpClient) http: HttpClient,
    ) {
        config.configure({
            baseUrl: 'https://jsonplaceholder.typicode.com',
            http
        });
    }
}
