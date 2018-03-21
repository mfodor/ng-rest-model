import {Observable} from 'rxjs/Observable';
import {RestService} from '../../';
import {RestModel} from '../service/rest-model';

export interface IHasMany<T extends RestService> extends HasManyProps<T>, Observable<T[]> {
}

export interface HasManyProps<T extends RestService> {
    $: Observable<T[]> | T[];
    _new(): T;
    _all(): Observable<T[]>;
    _find(id: number | string): Observable<T>;
    _add(item: T, options?: any): Observable<T>;
    _remove(item: T, options?: any): Observable<T>;
}

export interface HasManyConfiguration {
    // optional since there is default: no-api
    type?: 'service' | 'route' | 'params' | 'explicit' | 'no-api';

    // rest service to use to fetch data
    service?: RestService | RestModel;

    // if type is route this is the appended path route
    route?: string;

    // if type is param this is the params object to be attached
    params?: { [key: string]: string | number };

    // if type is explicit or params this route what will be requested
    path?: string;

    // function to be called after the data arrived. Only param is the response
    initFn?: Function;
}
