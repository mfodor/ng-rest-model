import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HasManyConfig} from '../annotations/index';
import {RestModel} from '../classes/index';
import {getter} from '../helpers/index';
import {ILengthAwarePaginator} from '../interfaces/index';
import {FetchMode} from './index';

export class HasManyHandler<T extends RestModel, P = ILengthAwarePaginator<T>> {
    private _list: T[] | Observable<T[]>;

    paging: P;

    constructor(
        private _owner: RestModel,
        private _config: HasManyConfig
    ) {
    }

    get list(): Observable<T[]> | T[] {
        if (this._list || this._config.fetch === FetchMode.EAGER) {
            return getter(this._config.async, this._list);
        }

        return this.getAll();
    }

    getAll(options?: any): Observable<T[]> {
        return this._list = this.fetchAll(options);
    }

    getPage(page?: string | number, options?: any): Observable<T[]> {
        return this.fetchPage(page, options);
    }

    setList(list: T[]): void {
        this._list = Array.isArray(list)
            ? list.map(i => new (<any>this._config.type)().addParent(this._owner).init(i))
            : list;
    }

    find(key: number | any): T {
        if (!this.listIsLoaded()) {
            return;
        }
        return (<T[]>this._list).find(i => i.primaryValue === key);
    }

    find$(key: number | any, options?: any): Observable<T> {
        return this.fetchItem(key, options);
    }

    save(item: T, options?: any): Observable<T> {
        return item.save(options).map((saved: any) => this.push(saved));
    }

    create(obj: T, options?: any): Observable<T> {
        let newItem = new this._config.type().addParent(this._owner).init(obj);
        return this.save(newItem, options);
    }

    remove(item: T, options?: any): Observable<T> {
        return item.remove(options).map((removed: any) => this.pull(removed));
    }

    push(item: T): T {
        if (!this.listIsLoaded()) {
            return;
        }
        (<T[]>this._list).push(item);
        return item;
    }

    pull(item: T): T {
        if (!this.listIsLoaded()) {
            return;
        }
        const index = (<T[]>this._list).findIndex(i => i.primaryValue === item.primaryValue);
        if (index > -1) {
            (<T[]>this._list).splice(index, 1);
        } else {
            console.warn('The item was not in the list!', item, this._list);
        }
        return item;
    }

    set(item: T, key?: number | any): T {
        if (!this.listIsLoaded()) {
            return;
        }
        key = key || item.primaryValue;
        const index = (<T[]>this._list).findIndex(i => i.primaryValue === key);
        if (index > -1) {
            (<T[]>this._list).splice(index, 1, item);
            return item;
        } else {
            console.warn('The item was not in the list!', item, this._list);
            return void 0;
        }
    }

    private fetchItem(key: number | any, options?: any): Observable<T> {
        return this.getParentedInstance().find(key, options)
                   .map((resp: T) => {
                       this.set(resp);
                       return resp;
                   });
    }

    private fetchAll(options?: any): Observable<T[]> {
        return this.getParentedInstance().all(options)
                   .map((resp: T[]) => {
                       this.setList(resp);
                       return <T[]>this._list;
                   });
    }

    private fetchPage(page?: string | number, options?: any): Observable<T[]> {
        let instance = this.getParentedInstance();
        return instance.page(page, options)
                       .map((resp: any) => {
                           this.paging = resp;
                           this.setList(resp[instance['$pagingItemsKey']]);
                           return <T[]>this._list;
                       });
    }

    private getParentedInstance(): T {
        return new this._config.type().addParent(this._owner);
    }

    private listIsLoaded(): boolean {
        if (!this._list || this._list instanceof Observable) {
            console.warn('No list present or is not fetched yet. This has prevented item to be pushed.');
            return false;
        }
        return true;
    }
}
