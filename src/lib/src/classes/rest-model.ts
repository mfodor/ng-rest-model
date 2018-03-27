import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {Observable} from 'rxjs/Observable';
import {ApiUrlMaker, ILengthAwarePaginator} from '../../index';
import {ngRestModelBaseUrl, ngRestModelHttp} from '../service/ng-rest-model-config';
import {HasManyHandler} from './index';

export class RestModel<I = any, P = ILengthAwarePaginator<I>> {
    protected $route: string;
    protected $primaryKey = 'id';
    protected $fillable: string[];
    protected $protected: string[];
    protected $mappingsTo: {[index: string]: string};
    protected $mappingsFrom: {[index: string]: string};
    protected $pagingItemsKey = 'data';
    protected $parents: RestModel[];
    $hasMany: {[index: string]: HasManyHandler<any>};

    protected get http(): HttpClient {
        return ngRestModelHttp();
    }

    /* *
     * Construction
     */

    constructor() {
        this.$primaryKey = this.$primaryKey || 'id';
        this.$protected = [
            '$route', '$primaryKey', '$fillable', '$protected', '$mappingsTo', '$mappingsFrom', '$pagingItemsKey', '$parents', '$hasMany'
        ]
            .concat((this.$protected || []));
        this.$parents = this.$parents || [];
        this.$hasMany = this.$hasMany || {};
        this.$mappingsTo = this.$mappingsTo || {};
        this.$mappingsFrom = this.$mappingsFrom || {};
        ['$protected', '$parents', '$hasMany', '$mappingsTo', '$mappingsFrom'].forEach(
            p => Object.defineProperty(this, p, {value: this[p], writable: false})
        );
    }

    init(obj?: I): this {
        this.clear();
        return <any>this.trustedFill(obj);
    }

    clear(): this {
        let fieldsToFill = this.getFieldsToFill();
        for (const key of fieldsToFill) {
            this[key] = void 0;
        }
        this[this.$primaryKey] = void 0;
        return this;
    }

    clone(): this {
        const clone = this._instantiate(<any>this);
        this.$parents.forEach(p => clone.addParent(p));
        return clone;
    }

    /* *
     * Getters and setters
     */

    get primaryValue(): number | any {
        return this[this.$primaryKey];
    }

    get postData(): any {
        return this.plain(true);
    }

    /* *
     * General functions
     */

    plain(toServer: boolean = false): I | any {
        const json = {};
        for (const key of this.getFieldsToFill()) {
            json[this.getMappedKey(key, toServer)] = this[key];
        }
        json[this.$primaryKey] = this.primaryValue;
        return json;
    }

    equals(other: I | any): boolean {
        if (!other || typeof other !== 'object' || this.primaryValue !== other[this.$primaryKey]) {
            return false;
        }
        const fieldsToCheck = this.getFieldsToFill();
        for (const f of fieldsToCheck) {
            if (this[f] !== other[f]) {
                return false;
            }
        }
        return true;
    }

    /* *
     * REST functions
     */

    // GET

    all(options?: any): Observable<this[] | any> {
        const obs = this.http.get(this.itemsUrl().build(), options);
        if (!options || !options.observe || options.observe === 'body') {
            return (<any>obs).map((items: I[]) => items.map(this._instantiate.bind(this)));
        }
        return <any>obs;
    }

    page(page?: string | number, options?: any): Observable<P> {
        if (!options && typeof page === 'object') {
            options = page;
            page = void 0;
        }
        let url: string;
        if (isNaN(+page) && typeof page === 'string') {
            url = page;
        } else {
            if (typeof page === 'number') {
                options = options || {};
                options.params = Object.assign(options.params || {}, {page});
            }
            url = this.itemsUrl().build();
        }
        const obs = this.http.get(url, options);
        if (!options || !options.observe || options.observe === 'body') {
            return (<any>obs).map((resp: P) => {
                resp[this.$pagingItemsKey] = resp[this.$pagingItemsKey].map(this._instantiate.bind(this));
                return resp;
            });
        }
        return <any>obs;
    }

    find(id: number | any, options?: any): Observable<this> {
        return this.http.get(this.itemUrl(id).build(), options).map(this._instantiate.bind(this));
    }

    fresh(options?: any): Observable<this> {
        return this.http.get(this.itemUrl(this.primaryValue).build(), options).map(this.init.bind(this));
    }

    // POST

    create(options?: any): Observable<this> {
        return this.http.post(this.itemsUrl().build(), this.postData, options).map(this.init.bind(this));
    }

    // PUT

    update(options?: any): Observable<this> {
        return this.http.put(this.itemUrl().build(), this.postData, options).map(this.init.bind(this));
    }

    save(options?: any): Observable<this> {
        return this.primaryValue ? this.update(options) : this.create(options);
    }

    // DELETE

    remove(options?: any): Observable<this> {
        return this.http.delete(this.itemUrl().build(), options).map(this.init.bind(this));
    }

    /* *
     * Initialization functions
     */

    protected onAfterFill() {
        // This method is to be overridden
    }

    fill(obj?: I | any, clearMissing: boolean = false): this {
        if (!obj || typeof obj !== 'object') {
            console.error('Trying to fill with non-object! This is a silence error.', obj);
            return <any>this;
        }

        const fieldsToFill = this.getFieldsToFill();
        for (const keyInModel of fieldsToFill) {
            const keyOnServer = this.getMappedKey(keyInModel, true);
            const hasValue = obj.hasOwnProperty(keyInModel) || obj.hasOwnProperty(keyOnServer);
            const value = hasValue
                ? obj.hasOwnProperty(keyInModel) ? obj[keyInModel] : obj[keyOnServer]
                : null;
            if (clearMissing || hasValue) {
                this[keyOnServer] = value;
            }
        }

        this.onAfterFill();
        return <any>this;
    }

    protected trustedFill(obj?: any): this {
        if (!obj || typeof obj !== 'object') {
            return <any>this;
        }
        for (const prop in obj) {
            if (this.$protected.indexOf(prop) === -1 && obj.hasOwnProperty(prop)) {
                this[this.getMappedKey(prop)] = obj[prop];
            }
        }
        this.onAfterFill();
        return <any>this;
    }

    /* *
     * URL generation
     */

    addParent(parent: RestModel): this {
        this.$parents.push(parent);
        return <any>this;
    }

    protected getBaseUrl(): ApiUrlMaker {
        return this.addParentRoutesTo();
    }

    protected addParentRoutesTo(maker?: ApiUrlMaker): ApiUrlMaker {
        maker = maker || new ApiUrlMaker(ngRestModelBaseUrl());
        if (this.$parents.length) {
            this.$parents.forEach(p => maker.one(p.$route, p.primaryValue));
        }
        return maker;
    }

    itemsUrl(): ApiUrlMaker {
        return this.getBaseUrl().all(this.$route);
    }

    itemUrl(id: number | any = null): ApiUrlMaker {
        return this.getBaseUrl().one(this.$route, id || this.primaryValue);
    }

    /* *
     * Overrides
     */

    toJSON() {
        return this.plain();
    }

    /* *
     * Private
     */

    private _instantiate(i: I): this {
        return new (<any>this.constructor)().init(i);
    }

    private getMappedKey(key: string, toServer: boolean = false): string {
        if (!toServer) {
            return this.$mappingsTo && this.$mappingsTo[key] || key;
        } else {
            return this.$mappingsFrom && this.$mappingsFrom[key] || key;
        }
    }

    private getFieldsToFill(): string[] {
        if (!this.$protected || !this.$protected.length) {
            throw new Error('Overwriting or deleting $protected field is forbidden!');
        }

        const excludeKeys = this.$protected.concat(this.$primaryKey);

        return (this.$fillable || Object.keys(this))
            .filter(key => excludeKeys.indexOf(key) === -1);
    }
}
