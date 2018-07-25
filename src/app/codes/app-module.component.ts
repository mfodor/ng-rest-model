import {Component} from '@angular/core';

@Component({
    selector: 'demo-app-module',
    template: '<pre><code>@NgModule({{ \'{\' }}\n' +
    '    imports: [\n' +
    '        BrowserModule,\n' +
    '        NgRestModelModule,\n' +
    '        FormsModule\n' +
    '    ],\n' +
    '    declarations: [\n' +
    '        AppComponent\n' +
    '    ],\n' +
    '    bootstrap: [\n' +
    '        AppComponent\n' +
    '    ]\n' +
    '})\n' +
    'export class AppModule {{ \'{\' }}\n' +
    '    constructor(\n' +
    '        @Inject(NgRestModelConfig) config: NgRestModelConfig,\n' +
    '        @Inject(HttpClient) http: HttpClient,\n' +
    '    ) {{ \'{\' }}\n' +
    '        config.configure({{ \'{\' }}\n' +
    '            baseUrl: \'https://jsonplaceholder.typicode.com\',\n' +
    '            http\n' +
    '        });\n' +
    '    }\n' +
    '}</code></pre>'
})
export class AppModuleComponent {
}
