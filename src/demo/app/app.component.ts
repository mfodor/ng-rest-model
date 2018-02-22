import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Album} from './album';
import {User} from './user';

export interface Tab {
    name: string;
}

export interface Tabs extends Array<Tab> {
    selected?: Tab;
}

@Component({
    selector: 'demo-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    users$: Observable<User[]>;
    selectedUser: User;

    formModels: {
        user: User;
        album: Album;
    };

    tabs: Tabs;

    constructor(private userService: User) {
    }

    ngOnInit() {
        this.users$ = this.userService.all();
        this.formModels = {
            user: null,
            album: null
        };
        this.tabs = [
            {name: 'app.module.ts'},
            {name: 'album.ts'},
            {name: 'user.ts'},
            {name: 'app.component.ts'},
            {name: 'app.component.html'}
        ];
        this.tabs.selected = this.tabs[0];
    }

    selectTab(tab: any, event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.tabs.selected = tab;
    }

    select(user: User) {
        if (this.selectedUser === user) {
            this.selectedUser = null;
            return;
        }
        this.selectedUser = user;
    }

    newUser() {
        this.formModels.user = this.userService.new();
    }

    editUser(user: User, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.formModels.user = user;
    }

    saveUser() {
        this.formModels.user.save()
            .subscribe((user: User) => {
                this.formModels.user = null;
                alert(`Saved user: ${user.name} (${user.email}, ${user.phone})`);
            });
    }

    removeUser(user: User, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        user.remove().subscribe((removed: User) => {
            alert(`Removed user: ${removed.name} (${removed.email}, ${removed.phone})`);
        });
    }

    newAlbum() {
        this.formModels.album = this.selectedUser.albums._new();
    }

    editAlbum(album: Album, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.formModels.album = album;
    }

    saveAlbum() {
        if (this.formModels.album.id) {
            this.updateAlbum();
        } else {
            this.addAlbum();
        }
    }

    addAlbum(): void {
        this.selectedUser.albums._add(this.formModels.album).subscribe((added: Album) => {
            this.formModels.album = null;
            alert('added album: ' + added.title);
        });
    }

    updateAlbum(): void {
        this.formModels.album.save().subscribe((updated: Album) => {
            this.formModels.album = null;
            alert('updated album: ' + updated.title);
        });
    }

    removeAlbum(album: Album, event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.selectedUser.albums._remove(album).subscribe((removed: Album) => {
            alert('removed album: ' + removed.title);
        });
    }
}
