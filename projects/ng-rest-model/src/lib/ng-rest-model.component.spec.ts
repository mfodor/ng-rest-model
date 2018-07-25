import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRestModelComponent } from './ng-rest-model.component';

describe('NgRestModelComponent', () => {
  let component: NgRestModelComponent;
  let fixture: ComponentFixture<NgRestModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgRestModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgRestModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
