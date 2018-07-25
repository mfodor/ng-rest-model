import { TestBed, inject } from '@angular/core/testing';

import { NgRestModelService } from './ng-rest-model.service';

describe('NgRestModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgRestModelService]
    });
  });

  it('should be created', inject([NgRestModelService], (service: NgRestModelService) => {
    expect(service).toBeTruthy();
  }));
});
