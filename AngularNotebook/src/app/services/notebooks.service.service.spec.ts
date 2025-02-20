import { TestBed } from '@angular/core/testing';

import { NotebooksServiceService } from './notebooks.service.service';

describe('NotebooksServiceService', () => {
  let service: NotebooksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotebooksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
