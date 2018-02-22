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
    '    formModels: {{ \'{\' }}\n' +
    '        user: User;\n' +
    '        album: Album;\n' +
    '    };\n' +
    '\n' +
    '    constructor(private userService: User) {{ \'{\' }}\n' +
    '    }\n' +
    '\n' +
    '    ngOnInit() {{ \'{\' }}\n' +
    '        this.users$ = this.userService.all();\n' +
    '        this.formModels = {{ \'{\' }}\n' +
    '            user: null,\n' +
    '            album: null\n' +
    '        };\n' +
    '    }\n' +
    '\n' +
    '    select(user: User) {{ \'{\' }}\n' +
    '        if (this.selectedUser === user) {{ \'{\' }}\n' +
    '            this.selectedUser = null;\n' +
    '            return;\n' +
    '        }\n' +
    '        this.selectedUser = user;\n' +
    '    }\n' +
    '\n' +
    '    newUser() {{ \'{\' }}\n' +
    '        this.formModels.user = this.userService.new();\n' +
    '    }\n' +
    '\n' +
    '    editUser(user: User, event: Event) {{ \'{\' }}\n' +
    '        // ...\n' +
    '    }\n' +
    '\n' +
    '    saveUser() {{ \'{\' }}\n' +
    '        this.formModels.user.save().subscribe(/* ... */);\n' +
    '    }\n' +
    '\n' +
    '    removeUser(user: User, event: Event) {{ \'{\' }}\n' +
    '        event.preventDefault();\n' +
    '        event.stopPropagation();\n' +
    '        user.remove().subscribe(/* ... */);\n' +
    '    }\n' +
    '\n' +
    '    newAlbum() {{ \'{\' }}\n' +
    '        this.formModels.album = this.selectedUser.albums._new();\n' +
    '    }\n' +
    '\n' +
    '    editAlbum(album: Album, event: Event) {{ \'{\' }}\n' +
    '        // ...\n' +
    '    }\n' +
    '\n' +
    '    saveAlbum() {{ \'{\' }}\n' +
    '        // ...\n' +
    '    }\n' +
    '\n' +
    '    addAlbum(): void {{ \'{\' }}\n' +
    '        this.selectedUser.albums._add(this.formModels.album).subscribe(/* ... */);\n' +
    '    }\n' +
    '\n' +
    '    updateAlbum(): void {{ \'{\' }}\n' +
    '        this.formModels.album.save().subscribe(/* ... */);\n' +
    '    }\n' +
    '\n' +
    '    removeAlbum(album: Album, event: Event): void {{ \'{\' }}\n' +
    '        event.preventDefault();\n' +
    '        event.stopPropagation();\n' +
    '        this.selectedUser.albums._remove(album).subscribe(/* ... */);\n' +
    '    }\n' +
    '}</code></pre>'
})
export class AppComponentComponent {
}
