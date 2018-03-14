import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export function getter (async: boolean, value: any): any | Observable<any> {
    if (!async || value instanceof Observable) {
        return value;
    }
    return Observable.of(value);
}
