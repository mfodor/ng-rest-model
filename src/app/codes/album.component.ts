import {Component} from '@angular/core';

@Component({
    selector: 'demo-album',
    template: '<pre><code>@Path(\'albums\')\n' +
    'export class Album extends RestModel&lt;Album&gt; {{ \'{\' }}\n\n' +
    '    @PrimaryKey()\n' +
    '    id: number;\n\n' +
    '    @Fillable()\n' +
    '    title: string;\n' +
    '}</code></pre>'
})
export class AlbumComponent {
}
