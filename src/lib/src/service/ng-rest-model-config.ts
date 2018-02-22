import {Injectable} from '@angular/core';

@Injectable()
export class NgRestModelConfig {

    private _baseUrl = '';

    public get baseUrl(): string {
        return this._baseUrl;
    }

    configure(options: INgRestModelConfig): void {
        this._baseUrl = options && options.baseUrl || this._baseUrl;
    }

}

export interface INgRestModelConfig {
    baseUrl?: string;
}
