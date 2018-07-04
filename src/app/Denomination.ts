import {Injectable} from '@angular/core';
import {Column, Fillable, Path, PrimaryKey, Protected, RestModel} from 'ng-rest-model';

@Path('denominations')
@Injectable()
export class Denomination extends RestModel<Denomination> {

    @PrimaryKey()
    id: string;

    @Fillable()
    name: string;

    @Fillable()
    note: string;

    @Protected()
    @Column('created_at')
    createdAt: number;

    @Protected()
    @Column('updated_at')
    updatedAt: number;

}