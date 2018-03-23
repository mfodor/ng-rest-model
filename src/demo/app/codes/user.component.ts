import {Component} from '@angular/core';

@Component({
    selector: 'demo-user',
    template: '<pre><code>@Path(\'users\')\n' +
    '@HasMany(\'albums\', Album)\n' +
    'export class User extends RestModel&lt;User&gt; {{ \'{\' }}\n\n' +
    '    @PrimaryKey()\n' +
    '    id: number;\n\n' +
    '    @Fillable()\n' +
    '    name: string;\n\n' +
    '    @Fillable()\n' +
    '    email: string;\n\n' +
    '    @Fillable()\n' +
    '    phone: string;\n' +
    '\n' +
    '    albums: Observable&lt;Album&gt;;\n' +
    '\n' +
    '}</code></pre>'
})
export class UserComponent {
}
