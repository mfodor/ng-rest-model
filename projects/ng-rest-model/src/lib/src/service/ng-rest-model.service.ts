import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {RestModel} from '../classes';
import {NG_REST_MODEL_OPTIONS} from '../ng-rest-model.token';

export class NgRestModelConfig {
    http?: HttpClient;
    baseUrl: string;
}

@Injectable()
export class NgRestModelService {
    private _config: NgRestModelConfig;

    // private _baseUrl: string;

    // private _http: HttpClient;

    public get baseUrl(): string {
        return this._config.baseUrl;
    }

    public get http(): HttpClient {
        return this._http;
    }

    public get config(): NgRestModelConfig {
        return this._config;
    }

    constructor(
        private _http: HttpClient,
        @Inject(NG_REST_MODEL_OPTIONS) config: any = null,
    ) {
        if (config) {
            this._config = config;
            this._config.http = this._http;
        }
    }

    m<T extends RestModel>(classDef: typeof RestModel | any): T {
        return <T> this.createModel(classDef);
    }

    createModel<T extends RestModel>(classDef: typeof RestModel | any): T {
        return <T> new classDef().config(this.config);
    }

}
