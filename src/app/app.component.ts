import {Component, OnInit} from '@angular/core';
import {Denomination} from './Denomination';
import {NgRestModelService} from 'ng-rest-model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';

    constructor(
        private restModel: NgRestModelService
    ) {}

    public ngOnInit() {
        this.restModel.m(Denomination).all().subscribe(denominations => {
            console.log(denominations);
        });
    }

}
