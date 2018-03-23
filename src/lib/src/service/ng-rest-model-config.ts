import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface INgRestModelConfig {
    http: HttpClient;
    baseUrl?: string;
}

const ngRestModelConfigStore: INgRestModelConfig = {
    http: null,
    baseUrl: ''
};

export function ngRestModelHttp(): HttpClient {
    return ngRestModelConfigStore.http;
}

export function ngRestModelBaseUrl(): string {
    return ngRestModelConfigStore.baseUrl;
}

@Injectable()
export class NgRestModelConfig {
    public get baseUrl(): string {
        return ngRestModelBaseUrl();
    }

    public get http(): HttpClient {
        return ngRestModelHttp();
    }

    configure(options: INgRestModelConfig): void {
        ngRestModelConfigStore.baseUrl = options && options.baseUrl || '';
        ngRestModelConfigStore.http = options && options.http;
    }
}
