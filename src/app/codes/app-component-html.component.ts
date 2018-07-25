import {Component} from '@angular/core';

@Component({
    selector: 'demo-app-component-html',
    template: `<pre><code>&lt;section class="row" id="data-table"&gt;
    &lt;div class="col"&gt;
      &lt;table class="table table-sm"&gt;
        &lt;tbody&gt;
        &lt;ng-template ngFor [ngForOf]="users$ | async" let-user&gt;
          &lt;tr (click)="select(user)"
              style="cursor: pointer"
              [class.table-active]="selectedUser === user"
          &gt;
            &lt;td&gt;
              &lt;a href="" (click)="removeUser(user, $event)"&gt;Remove&lt;/a&gt;
              &lt;a href="" (click)="editUser(user, $event)"&gt;Edit&lt;/a&gt;
            &lt;/td&gt;
            &lt;td&gt;{{ '{' }}{{ '{' }}user.name}}&lt;/td&gt;
            &lt;td&gt;{{ '{' }}{{ '{' }}user.email}}&lt;/td&gt;
            &lt;td&gt;{{ '{' }}{{ '{' }}user.phone}}&lt;/td&gt;
          &lt;/tr&gt;
          &lt;tr *ngIf="selectedUser === user"&gt;
            &lt;td colspan="4" class="py-5"&gt;
              &lt;h5 class="text-center"&gt;Albums:&lt;/h5&gt;
              &lt;div class="albums"&gt;
                &lt;table class="album-table m-auto"&gt;
                  &lt;tbody&gt;
                  &lt;ng-template [ngIf]="user.albums | async" let-albums [ngIfElse]="loading"&gt;
                    &lt;tr *ngFor="let album of albums"&gt;
                      &lt;td&gt;
                        &lt;a href="" (click)="removeAlbum(album, $event)"&gt;Remove&lt;/a&gt;
                        &lt;a href="" (click)="editAlbum(album, $event)"&gt;Edit&lt;/a&gt;
                      &lt;/td&gt;
                      &lt;td&gt;{{ '{' }}{{ '{' }} album.title }}&lt;/td&gt;
                    &lt;/tr&gt;
                  &lt;/ng-template&gt;
                  &lt;ng-template #loading&gt;
                    &lt;tr&gt;
                      &lt;td&gt;Loading...&lt;/td&gt;
                    &lt;/tr&gt;
                  &lt;/ng-template&gt;
                  &lt;/tbody&gt;
                &lt;/table&gt;
                &lt;button type="button" class="btn btn-outline-primary" (click)="newAlbum()"&gt;New album&lt;/button&gt;
                &lt;form (submit)="saveAlbum()" *ngIf="formModels.album"&gt;
                  &lt;input [(ngModel)]="formModels.album.title" name="title" placeholder="Title" /&gt;
                  &lt;button class="btn btn-outline-primary"&gt;Save&lt;/button&gt;
                &lt;/form&gt;
              &lt;/div&gt;
            &lt;/td&gt;
          &lt;/tr&gt;
        &lt;/ng-template&gt;
        &lt;/tbody&gt;
      &lt;/table&gt;
    &lt;/div&gt;
  &lt;/section&gt;

  &lt;section class="row" id="new-user"&gt;
    &lt;div class="col"&gt;
      &lt;button type="button" class="btn btn-outline-primary" (click)="newUser()"&gt;New user&lt;/button&gt;
      &lt;form (submit)="saveUser()" *ngIf="formModels.user"&gt;
        &lt;input [(ngModel)]="formModels.user.name" name="name" placeholder="Name" /&gt;
        &lt;input [(ngModel)]="formModels.user.email" name="email" placeholder="Email" /&gt;
        &lt;input [(ngModel)]="formModels.user.phone" name="phone" placeholder="Phone" /&gt;
        &lt;button class="btn btn-outline-primary"&gt;Save&lt;/button&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  &lt;/section&gt;</code></pre>`
})
export class AppComponentHtmlComponent {
}
