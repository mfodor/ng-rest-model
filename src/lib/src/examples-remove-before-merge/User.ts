import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';
import {HasMany, Path} from '../annotations';
import {FetchMode} from '../classes';
import {Article} from './Article';
import {Resource} from './Resource';
import {Role} from './Role';

@Path('users')
@HasMany('roles', Role)
@HasMany({
    field: 'articles',
    route: 'articles',
    type: Article,
    fetch: FetchMode.LAZY
})
export class User extends Resource /* RestService */ {
    public id: number;
    public name: string;
    public email: string;

    // HasMany
    public roles: Role[];

    // HasMany
    public articles: Article[];

    static all(): Observable<User[]> {
        const users = new User();
        return users.all();
    }

    constructor(
        id?: number | User | any,
        name?: string,
        email?: string,
        roles?: Role[],
        articles?: Article[],
    ) {
        super();

        if (typeof id === 'object') {
            this.trustedFill(id);
            return;
        }

        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = roles;
        this.articles = articles;
    }

    all(): Observable<User[]> {
        const list = [];
        list.push(new User({
            id: 1,
            name: 'John Doe',
            email: 'jdoe@company.com',
            roles: ['user']
        }));
        list.push(new User({
            id: 2,
            name: 'Manuel Fodor',
            email: 'mfodor@doxasoft.hu',
            roles: ['admin', 'user']
        }));

        return Observable.of(list).delay(1500);
    }
}
