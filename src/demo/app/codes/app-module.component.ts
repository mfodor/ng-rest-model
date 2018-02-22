import {Component} from '@angular/core';

@Component({
    selector: 'demo-app-module',
    template: '<pre><code>@NgModule({{ \'{\' }}\n' +
    '    imports: [\n' +
    '        BrowserModule,\n' +
    '        NgRestModelModule.forRoot({{ \'{\' }}baseUrl: \'https://jsonplaceholder.typicode.com\'}),\n' +
    '        FormsModule\n' +
    '    ],\n' +
    '    declarations: [\n' +
    '        AppComponent\n' +
    '    ],\n' +
    '    providers: [\n' +
    '        Album,\n' +
    '        User\n' +
    '    ],\n' +
    '    bootstrap: [\n' +
    '        AppComponent\n' +
    '    ]\n' +
    '})\n' +
    'export class AppModule {{ \'{\' }}}</code></pre>'
})
export class AppModuleComponent {
}
