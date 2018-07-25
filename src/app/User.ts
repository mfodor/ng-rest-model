import {Injectable} from '@angular/core';
import {Fillable, Path, PrimaryKey, RestModel} from 'ng-rest-model';

@Path('users')
@Injectable()
export class User extends RestModel<User> implements IUser {

    @PrimaryKey()
    id: number;

    @Fillable()
    name: string;

    @Fillable()
    username: string;

    @Fillable()
    email: string;

    @Fillable()
    phone: string;

    @Fillable()
    website: string;

    @Fillable()
    address: IAddress;

    @Fillable()
    company: ICompany;

}

export interface ICompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    phone: string;
    website: string;
    company: ICompany;
}
