import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HasManyConfiguration, HasManyProps, RestService} from '../../';

export class HasManyExtender<T extends RestService> implements HasManyProps<T> {
    private _list: T[];
    private _list$: Observable<T[]>;

    constructor(private config: HasManyConfiguration) {
    }

    extend(obs: any): any {
        obs = obs.map((list: T[]) => this._list = list);
        obs._new = this._new.bind(this);
        obs._all = this._all.bind(this);
        obs._find = this._find.bind(this);
        obs._add = this._add.bind(this);
        obs._remove = this._remove.bind(this);
        Object.defineProperty(obs, '$', {
            get: this.get$.bind(this),
            set: this.set$.bind(this)
        });
        return obs;
    }

    get $(): Observable<T[]> | T[] {
        return this._list$;
    }

    set $(list: Observable<T[]> | T[]) {
        if (list instanceof Observable) {
            this._list$ = list;
            list.map(l => this._list = l);
        } else {
            this._list = list;
            this._list$ = Observable.of(list);
        }
    }

    private get$(): Observable<T[]> | T[] {
        return this._list$;
    }

    private set$(list: Observable<T[]> | T[]) {
        if (list instanceof Observable) {
            this._list$ = list;
            list.map(l => this._list = l);
        } else {
            this._list = list;
            this._list$ = Observable.of(list);
        }
    }

    _new(): T {
        return <T>this.config.service.create();
    }

    _all(): Observable<T[]> {
        return <Observable<T[]>>this.$;
    }

    _find(id: number | string): Observable<T> {
        return this._all().map(list => list.find(i => i.primaryValue === id));
    }

    _add(item: T, options?: any): Observable<T> {
        return item.insert(options).map((updated: T) => {
            if (this._list) {
                this._list.push(updated);
            }
            return updated;
        });
    }

    _remove(item: T, options?: any): Observable<T> {
        return item.remove(options).map((removed: T) => {
            if (this._list) {
                const index = this._list.findIndex(i => i.primaryValue === item.primaryValue);
                if (index > -1) {
                    this._list.splice(index, 1);
                }
            }
            return removed;
        });
    }
}
