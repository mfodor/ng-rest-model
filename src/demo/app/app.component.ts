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

    selected: {
        user: User;
        album: Album;
    };

    ngOnInit() {
        this.users$ = User.all();
        this.formModels = {
            user: null,
            album: null
        };
        this.selected = {
            user: null,
            album: null
        };
    }

    select(user: User) {
        if (this.selectedUser === user) {
            this.selectedUser = null;
            return;
        }
        this.selectedUser = user;
    }

    newUser() {
        this.formModels.user = new User();
    }

    editUser(user: User, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.selected.user = user;
        this.formModels.user = user.clone();
    }

    saveUser() {
        this.formModels.user.save()
            .subscribe((user: User) => {
                if (this.selected.user) {
                    this.selected.user.fill(user);
                }
                this.selected.user = null;
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
        this.formModels.album = new Album();
    }

    editAlbum(album: Album, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.selected.album = album;
        this.formModels.album = album.clone();
    }

    saveAlbum() {
        if (this.formModels.album.id) {
            this.updateAlbum();
        } else {
            this.addAlbum();
        }
    }

    addAlbum(): void {
        this.selectedUser.$hasMany.albums.create(this.formModels.album).subscribe((added: Album) => {
            this.formModels.album = null;
            alert('added album: ' + added.title);
        });
    }

    updateAlbum(): void {
        this.formModels.album.save().subscribe((updated: Album) => {
            this.selected.album.fill(updated);
            this.selected.album = null;
            this.formModels.album = null;
            alert('updated album: ' + updated.title);
        });
    }

    removeAlbum(album: Album, event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.selectedUser.$hasMany.albums.remove(album).subscribe((removed: Album) => {
            alert('removed album: ' + removed.title);
        });
    }
}
