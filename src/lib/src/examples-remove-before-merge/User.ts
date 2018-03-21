import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {HasMany, Path} from '../annotations/index';
import {FetchMode} from '../classes/index';
import {Article} from './Article';
import {Role} from './Role';
import {RestModel} from '../service/index';

@Path('users')
@HasMany('roles', Role)
@HasMany({
    field: 'articles',
    route: 'articles',
    type: Article,
    fetch: FetchMode.LAZY
})
export class User extends RestModel {
    public id: number;
    public name: string;
    public email: string;

    // HasMany
    public roles: Role[];

    // HasMany
    public articles: Article[];

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
}
