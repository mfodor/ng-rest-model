import {Fillable, Path, PrimaryKey, RestModel} from 'ng-rest-model';

export interface IAlbum {
    id: number;
    title: string;
}

@Path('albums')
export class Album extends RestModel<IAlbum> {

    @PrimaryKey()
    id: number;

    @Fillable()
    title: string;

}
