import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgRestModelModule} from 'ng-rest-model';
import {Album} from './album';
import {AppComponent} from './app.component';
import {AlbumComponent} from './codes/album.component';
import {AppComponentHtmlComponent} from './codes/app-component-html.component';
import {AppComponentComponent} from './codes/app-component.component';
import {AppModuleComponent} from './codes/app-module.component';
import {UserComponent} from './codes/user.component';
import {User} from './user';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        NgRestModelModule.forRoot({baseUrl: 'https://jsonplaceholder.typicode.com'}),
        FormsModule
    ],
    declarations: [
        AppComponent,
        AppComponentComponent,
        AppComponentHtmlComponent,
        AppModuleComponent,
        AlbumComponent,
        UserComponent
    ],
    providers: [
        Album,
        User
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
