import {BelongsTo, Column, Path, PrimaryKey, Protected} from '../annotations/index';
import {User} from './User';
import {RestModel} from '../service/index';

@Path('users')
@BelongsTo('author', User)
export class Article extends RestModel {

    @PrimaryKey()
    public azon: number;

    public title: string;

    @Column('author_id')
    public authorId: number;

    @Protected()
    @Column('created_at')
    public createdAt: string;

    @Protected()
    @Column('updated_at')
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
