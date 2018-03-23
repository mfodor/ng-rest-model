import {Observable} from 'rxjs/Observable';
import {getter} from './getter';
import 'rxjs/add/observable/of';

describe('getter', () => {

    it('should return the value if async is false', () => {
        const values = [243, 'nick', void 0, null, {property: 'prop'}, [32, 452]];
        values.forEach(v => expect(getter(false, v)).toBe(v));
    });

    it('should return the value if it is already an Observable', () => {
        const observable = Observable.of({property: 'prop'});
        expect(getter(false, observable)).toBe(observable);
        expect(getter(true, observable)).toBe(observable);
    });

    it('should return the value as an Observable if it is not already one and async is true', () => {
        const value = {property: 'prop'};
        let obs = getter(true, value);
        expect(obs instanceof Observable).toBe(true);
        expect(obs.value).toBe(value);
    });
});
