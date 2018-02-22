import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgRestModelModule } from 'ng-rest-model';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, NgRestModelModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
