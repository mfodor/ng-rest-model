import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

/**
 * This class was the experimental class for learning annotations (decorators) in TypeScript.
 * Some functionalities or new naming conventions should be adopted.
 */
export abstract class Resource {
    protected $route: string;
    protected $fillable: string[];
    protected $protected: string[];
    protected $primaryKey: string;
    protected $mappings: { [index: string]: string };

    protected get primaryValue(): number | string {
        return this[this.$primaryKey];
    }

    constructor() {
        this.$primaryKey = this.$primaryKey || 'id';
        this.$protected = ['$route', '$fillable', '$protected', '$primaryKey', '$mappings']
            .concat((this.$protected || []));
        Object.defineProperty(this, '$protected', {value: this.$protected, writable: false});
    }

    fill(obj: this): this {
        const fieldsToFill = this.getFieldsToFill();
        for (const key of fieldsToFill) {
            if (obj.hasOwnProperty(key)) {
                this[this.getMappedKey(key)] = obj[key];
            }
        }
        return this;
    }

    public lazyLoad(route: string, field?: string): Observable<any> {
        field = field || route;

        // TODO keep this (fix if needed)
        // return this._http.get([this.itemUrl(), route].join('/')).map(resp => this[field] = resp);

        // TODO remove this
        const list = [];
        const count = Math.round(Math.random() * 5) + 1;
        const id = Math.round(Math.random() * 20);
        for (let i = 0; i < count; i++) {
            list.push({
                azon: id + i,
                title: 'Added later',
                author_id: 1,
                created_at: '2017-11-17',
                updated_at: '2018-02-21',
            });
        }

        return Observable.of(list)
            .delay(500 + Math.round(Math.random() * 2500))
            .map(resp => this[field] = resp);
    }

    plain() {
        const json = {};
        json[this.$primaryKey] = this.primaryValue;
        for (const key of this.getFieldsToFill()) {
            json[this.getMappedKey(key)] = this[key];
        }
        return json;
    }

    toJSON() {
        return this.plain();
    }

    protected trustedFill(obj: this): this {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                this[this.getMappedKey(key)] = obj[key];
            }
        }
        return this;
    }

    protected itemsUrl() {
        return this.$route;
    }

    protected itemUrl() {
        return [this.$route, this.primaryValue].join('/');
    }

    private getMappedKey(key: string): string {
        return this.$mappings && this.$mappings[key] || key;
    }

    protected getFieldsToFill(): string[] {
        if (!this.$protected && this.$protected.length) {
            throw new Error('Overwriting or deleting $protected field is forbidden!');
        }

        const excludeKeys = this.$protected.concat(this.$primaryKey);

        return (this.$fillable || Object.keys(this))
            .filter(key => excludeKeys.indexOf(key) === -1);
    }
}
