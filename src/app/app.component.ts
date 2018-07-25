import {Component, OnInit} from '@angular/core';
import {NgRestModelService} from 'ng-rest-model';
import {User} from './User';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';

    constructor(
        private restService: NgRestModelService
    ) {
    }

    public ngOnInit() {
        this.restService.m(User).all().subscribe(users => {
            console.log(users);
        });
    }

}
