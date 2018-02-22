import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NgRestModelConfig, RestService} from 'ng-rest-model';
import 'rxjs/add/operator/map';

@Injectable()
export class Album extends RestService<Album> {
    id: number;
    title: string;

    protected route = 'albums';
    protected fillable = ['title'];

    constructor(http: HttpClient, config: NgRestModelConfig) {
        super(http, config);
    }
}
