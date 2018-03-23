# NgRestModel Documentation

[Back to the index](README.md)

## Usage

### Table of contents

- [Import the module](#import-the-module)
- [Create your model](#create-your-model)
- [Instantiate and use your model](#instantiate-and-use-your-model)

For detailed usage of annotations and classes see their own documentation.

### Import the module

First add this module to your main module's (AppModule) imports array.
**You also need to create the constructor for your main module to configure this module!**

```typescript
@NgModule({
    imports: [
        NgRestModelModule
    ]
})
export class AppModule {
    constructor(
        @Inject(NgRestModelConfig) config: NgRestModelConfig,
        @Inject(HttpClient) http: HttpClient,
    ) {
        config.configure({
            baseUrl: 'https://mydomain.com/api',
            http
        });
    }
}
```

If the same domain should be called (e.g. the requests are proxied) the `baseUrl` should be '""' (empty string).

### Create your model

You have to extend the class RestModel. Generic type is optional.

```typescript
@Path('users')
@HasMany('albums', Album)
export class User extends RestModel<User> {
    @PrimaryKey()
    id: number;
    
    @Fillable()
    name: string;
    
    @Fillable()
    @Column('first_name')
    firstName: string;
    
    @Fillable()
    @Column('last_name')
    lastName: string;
    
    @Fillable()
    email: string;
    
    @Fillable()
    phone: string;

    // load is triggered on get
    albums: Observable<Album[]>;
}

@Path('albums')
@BelongsTo('user', User)
export class Album extends RestModel<Album> {
    @PrimaryKey()
    id: number;
    
    @Fillable()
    title: string;

    // load is triggered on get
    user: Observable<User>;
}
```

### Instantiate and use your model

```typescript
@Component({
    selector: 'demo-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    users$: Observable<User[]>;

    ngOnInit() {
        this.users$ = new User().all();
    }
}
```

```html
<table class="table table-sm">
    <tbody>
    <ng-template ngFor [ngForOf]="users$ | async" let-user>
      <tr (click)="select(user)"
          style="cursor: pointer"
          [class.table-active]="selectedUser === user"
      >
        <td>
          <a href="" (click)="removeUser(user, $event)">Remove</a>
          <a href="" (click)="editUser(user, $event)">Edit</a>
        </td>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
        <td>{{user.phone}}</td>
      </tr>
      <tr *ngIf="selectedUser === user">
        <td colspan="4" class="py-5">
          <h5 class="text-center">Albums:</h5>
          <div class="albums">
            <table class="album-table m-auto">
              <tbody>
              <ng-template [ngIf]="user.albums | async" let-albums [ngIfElse]="loading">
                <tr *ngFor="let album of albums">
                  <td>
                    <a href="" (click)="removeAlbum(album, $event)">Remove</a>
                    <a href="" (click)="editAlbum(album, $event)">Edit</a>
                  </td>
                  <td>{{ album.title }}</td>
                </tr>
              </ng-template>
              <ng-template #loading>
                <tr>
                  <td>Loading...</td>
                </tr>
              </ng-template>
              </tbody>
            </table>
            <button type="button" class="btn btn-outline-primary" (click)="newAlbum()">New album</button>
            <form (submit)="saveAlbum()" *ngIf="formModels.album">
              <input [(ngModel)]="formModels.album.title" name="title" placeholder="Title" />
              <button class="btn btn-outline-primary">Save</button>
            </form>
          </div>
        </td>
      </tr>
    </ng-template>
    </tbody>
</table>
```
