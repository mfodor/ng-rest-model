import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HasMany, NgRestModelConfig, RestService} from 'ng-rest-model';
import {Album} from './album';

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
