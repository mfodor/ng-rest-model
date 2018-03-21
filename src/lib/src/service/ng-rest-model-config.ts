import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NgRestModelConfig {

    static BASE_URL: string;
    static HTTP: HttpClient;

    public get baseUrl(): string {
        return NgRestModelConfig.BASE_URL;
    }

    public get http(): HttpClient {
        return NgRestModelConfig.HTTP;
    }

    configure(options: INgRestModelConfig): void {
        NgRestModelConfig.BASE_URL = options && options.baseUrl || '';
        NgRestModelConfig.HTTP = options && options.http;
    }

}

export interface INgRestModelConfig {
    http: HttpClient;
    baseUrl?: string;
}
