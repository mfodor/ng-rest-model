# ng-rest-model
A JavaScript model class for easily calling REST API inspired by Laravel's ORM

# Warning

This module is under hard development but is usable already. However, there is no
warranty that it won't fail in some situations.

## Upcoming improvements

- annotations (including @Path, @HasMany, @BelongsTo, @Mapping, @Protected, @PrimaryKey)
- unit tests

## Unresolved issues

Below are the issues that are about to be avoided/eliminated but there are no
ideas currently how to do. If you are aware of the solution any of them, please
let me know. Email: mfodor@doxasoft.hu.

#### avoid the need of passing any parameters to RestService constructor

This is basicly needed now because of HttpClient especially when JWT interceptor
comes to play - tested with [@auth0/angular-jwt](https://github.com/auth0/angular2-jwt)

## Usage

### Import the module

First add this Module to your main module.

```typescript
@NgModule({
    imports: [
        // ...
        NgRestModelModule.forRoot({baseUrl: 'https://mydomain.com/api'})
    ]
    // ...
})
```

If the same domain should be called (e.g. the requests are proxied) the `forRoot()` can be left.

### Create and provide your service

```typescript
@NgModule({
    provide: [
        User
    ]
})
```

You have to extend the abstract class RestService. Generic type is optional.

```typescript
@Injectable()
export class User extends RestService<User> {
    id: number;
    name: string;
    email: string;
    phone: string;

    albums: HasMany<Album>;

    protected route = 'users';
    protected fillable = ['name', 'email', 'phone'];

    constructor(http: HttpClient, config: NgRestModelConfig, albumService: Album) {
        super(http, config);
        this._constructorParams.push(albumService);
        this.hasMany = {
            albums: albumService
        };
    }
}
```

### Inject and use your service

```typescript
@Component({
    selector: 'demo-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    users$: Observable<User[]>;

    constructor(private userService: User) {
    }

    ngOnInit() {
        this.users$ = this.userService.all();
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

## Contributing

Any contribution is welcome if the goal is not missed: to have a useful ORM
like service that not fits for every situation but for most of the cases and is
easily configurable.

More details in the [CONTRIBUTING.md](CONTRIBUTING.md) file.
