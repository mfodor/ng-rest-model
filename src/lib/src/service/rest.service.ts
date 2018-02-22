import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {Observable} from 'rxjs/Observable';
import {ApiUrlMaker, HasManyConfiguration, HasManyExtender, NgRestModelConfig} from '../../';

@Injectable()
export abstract class RestService<I = any> {
    protected abstract route: string;
    protected fillable: string[] = [];
    protected primaryKey = 'id';
    protected parents: RestService[] = [];
    protected hasMany: { [key: string]: HasManyConfiguration | RestService };

    protected _constructorParams: any[] = [];
    private _hasManyStore: { [key: string]: Observable<any[]> } = {};

    constructor(
        protected _http: HttpClient,
        protected _config: NgRestModelConfig
    ) {
        this._constructorParams = [this._http, this._config];
    }

    init(obj?: I): this {
        return <any>this.trustedFill(obj);
    }

    /* *
     * Getters and setters
     */

    get create(): (obj?: I) => this {
        return this._create.bind(this);
    }

    get primaryValue(): number | any {
        return this[this.primaryKey];
    }

    get postData(): any {
        return this.toJSON();
    }

    /* *
     * REST functions
     */

    // GET

    all(options?: any): Observable<this[] | any> {
        const obs = this._http.get(this.itemsUrl().build(), options);
        if (!options || !options.observe || options.observe === 'body') {
            return (<any>obs).map((items: I[]) => items.map(this._create.bind(this)));
        }
        return <any>obs;
    }

    find(id: number | any, options?: any): Observable<this> {
        return this._http.get(this.itemUrl(id).build(), options).map(this._create.bind(this));
    }

    refresh(options?: any): Observable<this> {
        return this._http.get(this.itemUrl(this.primaryValue).build(), options).map(this.trustedFill.bind(this));
    }

    // POST

    insert(options?: any): Observable<this> {
        return this._http.post(this.itemsUrl().build(), this.postData, options).map(this.trustedFill.bind(this));
    }

    // PUT

    update(options?: any): Observable<this> {
        return this._http.put(this.itemUrl().build(), this.postData, options).map(this.trustedFill.bind(this));
    }

    save(options?: any) {
        return this.primaryValue ? this.update(options) : this.insert(options);
    }

    // DELETE

    remove(options?: any) {
        return this._http.delete(this.itemUrl().build(), options).map(this.trustedFill.bind(this));
    }

    /* *
     * Initialization functions
     */

    protected onAfterFill() {
    }

    fill(obj?: I): this {
        if (!obj) {
            return;
        }
        if (this.fillable) {
            this.fillable.forEach(f => {
                if (obj.hasOwnProperty(f)) {
                    this[f] = obj[f];
                }
            });
        }
        this.onAfterFill();
        return <any>this;
    }

    protected trustedFill(obj?: any): this {
        if (typeof obj !== 'object') {
            return <any>this;
        }
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                this[prop] = obj[prop];
            }
        }
        this.onAfterFill();
        return <any>this;
    }

    private _create(obj?: I): this {
        const service = this.new();
        this.parents.forEach(p => service.addParent(p));
        return service.init(obj);
    }

    public new(): this {
        const service = new (<any>this.constructor)(...this._constructorParams);
        service.hasMany = this.hasMany;
        service.mixinAllHasMany();
        return service;
    }

    /* *
     * HasMany
     *
     * This functionality is for making it easy to define has many connected data sets
     * that can be fetched eagerly or with the base data as well. It also maps items to classes.
     *
     * Examples:
     * class User extends RestService<IUser> {
     *   hasMany = {
     *     posts: Post
     *   };
     * }
     * URL: baseUrl/users/:userId/posts
     *
     * class User extends RestService<IUser> {
     *   hasMany = {
     *     posts: {
     *       type: 'params',
     *       path: 'posts',
     *       params: {
     *         userId: ':id'
     *       }
     *     }
     *   };
     * }
     * URL: baseUrl/posts?userId=:userId
     */

    private mixinAllHasMany(): void {
        if (!this.hasMany) {
            return;
        }
        for (let key in this.hasMany) {
            if (this.hasMany.hasOwnProperty(key)) {
                this.mixinHasMany(key);
            }
        }
    }

    private mixinHasMany(key: string): void {
        Object.defineProperty(this, key, {
            get: () => this.load(key),
            set: (values: any[]) => {
                this._hasManyStore[key] = Observable.of(values);
            }
        });
    }

    load<T = any>(key: string): Observable<T[]> {
        if (this._hasManyStore[key]) {
            return this._hasManyStore[key];
        }

        let hasManyConfig: HasManyConfiguration = this.hasMany && this.hasMany[key];

        if (!hasManyConfig) {
            return Observable.of(null);
        }

        if (hasManyConfig instanceof RestService) {
            hasManyConfig = {
                type: 'service',
                service: hasManyConfig.new().addParent(this)
            };
        } else {
            hasManyConfig.type = hasManyConfig.type || 'service';
        }

        let obs: Observable<T[]>;
        switch (hasManyConfig.type) {
            case 'service':
                return this._hasManyStore[key] = new HasManyExtender(hasManyConfig).extend(hasManyConfig.service.all());

            case 'route':
                if (!hasManyConfig.route) {
                    throw new Error('Missing route configuration!');
                }
                obs = <any>this._http.get(this.itemUrl().all(hasManyConfig.route).build());
                break;

            case 'params':
                if (!hasManyConfig.params) {
                    throw new Error('Missing params configuration!');
                }

            // tslint:disable-next-line:no-switch-case-fall-through
            case 'explicit':
                if (!hasManyConfig.path) {
                    throw new Error('Missing path configuration!');
                }
                obs = <any>this._http.get(
                    this.getBaseUrl().all(hasManyConfig.path).params(this.paramsFrom(hasManyConfig.params)).build()
                );
                break;

            case 'no-api':
                return Observable.of(this[key]);

            default:
                throw new Error(`Invalid has many configuration!\nkey: ${key}\nconfig: ${JSON.stringify(hasManyConfig)}`);
        }

        obs = typeof hasManyConfig.initFn === 'function'
            ? obs.map(i => hasManyConfig.initFn(i))
            : obs;

        return this._hasManyStore[key] = new HasManyExtender(hasManyConfig).extend(obs);
    }

    private paramsFrom(params: any): any {
        if (!params) {
            return params;
        }

        const processed = {};
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                processed[key] = params[key].startsWith(':') ? this[params[key].substring(1)] : params[key];
            }
        }
        return processed;
    }

    /* *
     * URL generation
     */

    addParent(parent: RestService): this {
        this.parents.push(parent);
        return <any>this;
    }

    protected getBaseUrl(): ApiUrlMaker {
        return this.addParentRoutesTo();
    }

    protected addParentRoutesTo(maker?: ApiUrlMaker): ApiUrlMaker {
        maker = maker || new ApiUrlMaker(this._config.baseUrl);
        if (this.parents.length) {
            this.parents.forEach(p => maker.one(p.route, p.primaryValue));
        }
        return maker;
    }

    protected itemsUrl(): ApiUrlMaker {
        return this.getBaseUrl().all(this.route);
    }

    protected itemUrl(id: number | any = null): ApiUrlMaker {
        return this.getBaseUrl().one(this.route, id || this.primaryValue);
    }

    /* *
     * Overrides
     */

    toJSON() {
        const json = {};
        for (const prop of this.fillable) {
            json[prop] = this[prop];
        }
        json[this.primaryKey] = this.primaryValue;
        return json;
    }
}
