import {Component, OnInit} from '@angular/core';
import {Tabs} from '../app.component';

@Component({
    selector: 'demo-codes',
    templateUrl: './codes.component.html'
})
export class CodesComponent implements OnInit {

    tabs: Tabs;

    ngOnInit() {
        this.tabs = [
            {name: 'app.module.ts'},
            {name: 'album.ts'},
            {name: 'user.ts'},
            {name: 'app.component.ts'},
            {name: 'app.component.html'}
        ];
        this.tabs.selected = this.tabs[0];
    }

    selectTab(tab: any, event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.tabs.selected = tab;
    }

}
