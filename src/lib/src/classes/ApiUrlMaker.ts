export class ApiUrlMaker {
    private _parts: string[];
    private _query: string[];

    constructor(baseUrl: string = '') {
        this._parts = [baseUrl];
        this._query = [];
    }

    public one(collection: string | number, element: string | number): ApiUrlMaker {
        this.addPart(collection);
        return element && this.addPart(element) || this;
    }

    public all(collection: string | number): ApiUrlMaker {
        return this.addPart(collection);
    }

    private addPart(part: string | number): ApiUrlMaker {
        if (!this.isValidArgument(part)) {
            throw new Error('InvalidArgumentException');
        }
        this._parts.push('' + part);
        return this;
    }

    public params(params: {[key: string]: number | string}): ApiUrlMaker {
        if (!params) {
            return this;
        }
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                this.param(key, params[key]);
            }
        }
        return this;
    }

    public param(key: string | number, value: string | number): ApiUrlMaker {
        if (key && (typeof key === 'string' || typeof key === 'number')) {
            this._query.push(`${key}=${value}`);
        }
        return this;
    }

    public build(): string {
        const parts = [this._parts.join('/')];
        if (this._query.length) {
            parts.push(this._query.join('&'));
        }
        return parts.join('?');
    }

    private isValidArgument(arg: any): boolean {
        return (typeof arg === 'string' && arg !== '') ||
            (typeof arg === 'number' && !isNaN(arg));
    }

    toString(): string {
        return this.build();
    }
}
