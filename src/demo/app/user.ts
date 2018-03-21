import {FetchMode, HasMany, Path, PrimaryKey, RestModel} from 'ng-rest-model';
import {Observable} from 'rxjs/Observable';
import {Album} from './album';

export interface IUser {
    id: number;
    name: string;
    email: string;
    phone: string;

    albums?: Observable<Album>;
}

@Path('users')
@HasMany('albums', Album)
export class User extends RestModel<IUser> {

    // @PrimaryKey()
    id: number;

    name: string;

    email: string;

    phone: string;

    // HasMany
    albums: Observable<Album>;

    protected $fillable = ['name', 'email', 'phone'];

    constructor(
        idOrObj?: number | IUser,
        name?: string,
        email?: string,
        phone?: string,
    ) {
        super();
        if (!idOrObj) {
            return;
        }
        if (typeof idOrObj === 'object') {
            this.init(idOrObj);
        } else {
            this.init({
                id: idOrObj,
                name,
                email,
                phone
            });
        }
    }

}
