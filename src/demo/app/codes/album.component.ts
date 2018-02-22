import {Component} from '@angular/core';

@Component({
    selector: 'demo-album',
    template: '<pre><code>@Injectable()\n' +
    'export class Album extends RestService&lt;Album&gt; {{ \'{\' }}\n' +
    '    id: number;\n' +
    '    title: string;\n' +
    '\n' +
    '    protected route = \'albums\';\n' +
    '    protected fillable = [\'title\'];\n' +
    '\n' +
    '    constructor(http: HttpClient, config: NgRestModelConfig) {{ \'{\' }}\n' +
    '        super(http, config);\n' +
    '    }\n' +
    '}</code></pre>'
})
export class AlbumComponent {
}
