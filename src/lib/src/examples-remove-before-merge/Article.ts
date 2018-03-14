import {BelongsTo, Mapping, Path, PrimaryKey, Protected} from '../annotations';
import {Resource} from './Resource';
import {User} from './User';

@Path('users')
@BelongsTo('author', User)
export class Article extends Resource /* RestService */ {

    @PrimaryKey()
    public azon: number;

    public title: string;

    @Mapping('author_id')
    public authorId: number;

    @Protected()
    @Mapping('created_at')
    public createdAt: string;

    @Protected()
    @Mapping('updated_at')
    public updatedAt: string;

    // BelongsTo
    public author: User;

    constructor(
        azon?: number | Article | any,
        title?: string,
        authorId?: number
    ) {
        super();

        if (typeof azon === 'object') {
            this.trustedFill(azon);
            return;
        }

        this.azon = azon;
        this.title = title;
        this.authorId = authorId;
    }
}
