import {Component} from '@angular/core';

@Component({
    selector: 'demo-app-component',
    template: '<pre><code>@Component({{ \'{\' }}\n' +
    '    selector: \'demo-app\',\n' +
    '    templateUrl: \'./app.component.html\'\n' +
    '})\n' +
    'export class AppComponent implements OnInit {{ \'{\' }}\n' +
    '    users$: Observable&lt;User[]&gt;;\n' +
    '    selectedUser: User;\n' +
    '\n' +
    '    // ...\n' +
    '\n' +
    '    ngOnInit() {{ \'{\' }}\n' +
    '        this.users$ = new User().all();\n' +
    '        // ...\n' +
    '    }\n' +
    '\n' +
    '    // ...\n' +
    '\n' +
    '    newUser() {{ \'{\' }}\n' +
    '        this.formModels.user = new User();\n' +
    '    }\n' +
    '\n' +
    '    editUser(user: User, event: Event) {{ \'{\' }}\n' +
    '        this.formModels.user = user.clone();\n' +
    '    }\n' +
    '\n' +
    '    saveUser() {{ \'{\' }}\n' +
    '        this.formModels.user.save().subscribe(/* ... */);\n' +
    '    }\n' +
    '\n' +
    '    removeUser(user: User, event: Event) {{ \'{\' }}\n' +
    '        user.remove().subscribe(/* ... */);\n' +
    '    }\n' +
    '\n' +
    '    newAlbum() {{ \'{\' }}\n' +
    '        this.formModels.album = new Album();\n' +
    '    }\n' +
    '\n' +
    '    editAlbum(album: Album, event: Event) {{ \'{\' }}\n' +
    '        this.formModels.album = album.clone();\n' +
    '    }\n' +
    '\n' +
    '    saveAlbum() {{ \'{\' }}\n' +
    '        // ...\n' +
    '    }\n' +
    '\n' +
    '    addAlbum(): void {{ \'{\' }}\n' +
    '        this.selectedUser.$hasMany.albums.create(this.formModels.album).subscribe(/* ... */);\n' +
    '    }\n' +
    '\n' +
    '    updateAlbum(): void {{ \'{\' }}\n' +
    '        this.formModels.album.save().subscribe(/* ... */);\n' +
    '    }\n' +
    '\n' +
    '    removeAlbum(album: Album, event: Event): void {{ \'{\' }}\n' +
    '        this.selectedUser.$hasMany.albums.remove(album).subscribe(/* ... */);\n' +
    '    }\n' +
    '}</code></pre>'
})
export class AppComponentComponent {
}
