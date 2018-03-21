import {Path, PrimaryKey, RestModel} from 'ng-rest-model';
import 'rxjs/add/operator/map';

export interface IAlbum {
    id: number;
    title: string;
}

@Path('albums')
export class Album extends RestModel<IAlbum> {

    // @PrimaryKey()
    id: number;

    title: string;

    // protected route = 'albums';
    protected $fillable = ['title'];

    constructor(
        idOrObj?: number | IAlbum,
        title?: string
    ) {
        super();
        if (!idOrObj) {
            return;
        }
        if (typeof idOrObj === 'object') {
            this.init(idOrObj);
        } else {
            this.init({id: idOrObj, title});
        }
    }
}
