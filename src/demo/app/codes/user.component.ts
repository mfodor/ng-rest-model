import {Component} from '@angular/core';

@Component({
    selector: 'demo-user',
    template: '<pre><code>@Injectable()\n' +
    'export class User extends RestService&lt;User&gt; {{ \'{\' }}\n' +
    '    id: number;\n' +
    '    name: string;\n' +
    '    email: string;\n' +
    '    phone: string;\n' +
    '\n' +
    '    albums: HasMany&lt;Album&gt;;\n' +
    '\n' +
    '    protected route = \'users\';\n' +
    '    protected fillable = [\'name\', \'email\', \'phone\'];\n' +
    '\n' +
    '    constructor(http: HttpClient, config: NgRestModelConfig, albumService: Album) {{ \'{\' }}\n' +
    '        super(http, config);\n' +
    '        this._constructorParams.push(albumService);\n' +
    '        this.hasMany = {{ \'{\' }}\n' +
    '            albums: albumService\n' +
    '        };\n' +
    '    }\n' +
    '}</code></pre>'
})
export class UserComponent {
}
