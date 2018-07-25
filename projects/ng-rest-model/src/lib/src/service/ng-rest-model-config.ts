import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface INgRestModelConfig {
    http: HttpClient;
    baseUrl?: string;
}

export const NgRestModelConfigStore: INgRestModelConfig = {
    http: null,
    baseUrl: ''
};

export function ngRestModelHttp(): HttpClient {
    return NgRestModelConfigStore.http;
}

export function ngRestModelBaseUrl(): string {
    return NgRestModelConfigStore.baseUrl;
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
        NgRestModelConfigStore.baseUrl = options && options.baseUrl || '';
        NgRestModelConfigStore.http = options && options.http;
    }
}
