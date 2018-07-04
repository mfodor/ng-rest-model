import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';

export function getter (async: boolean, value: any): any | Observable<any> {
    if (!async || value instanceof Observable) {
        return value;
    }
    return of(value);
}
