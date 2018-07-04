import {HttpClient} from '@angular/common/http';
import {Injectable, Optional} from '@angular/core';
import {RestModel} from '../classes';

export interface INgRestModelConfig {
    http?: HttpClient;
    baseUrl?: string;
}

export class NgRestModelConfig implements INgRestModelConfig {
    http: HttpClient;
    baseUrl: string;
}

@Injectable()
// @Injectable({
//     providedIn: 'root'
// })
export class NgRestModelService {
    private _baseUrl: string;

    // private _http: HttpClient;

    public get baseUrl(): string {
        return this._baseUrl;
    }

    public get http(): HttpClient {
        return this._http;
    }

    public get config(): INgRestModelConfig {
        return {
            http: this._http,
            baseUrl: this._baseUrl
        };
    }

    constructor(
        private _http: HttpClient,
        @Optional() config: NgRestModelConfig,
    ) {
        console.log('consturcting NgRestModelService, config: ', config);
        if (config) {
            this.configure(config);
        }
    }

    configure(options: INgRestModelConfig): void {
        this._http = options && options.http || this._http;
        this._baseUrl = options && options.baseUrl || this._baseUrl || '';
    }

    m<T extends RestModel>(classDef: typeof RestModel | any): T {
        return <T> this.createModel(classDef);
    }

    createModel<T extends RestModel>(classDef: typeof RestModel | any): T {
        console.log('creating model with config: ', this.config);
        return <T> new classDef().config(this.config);
    }

}
