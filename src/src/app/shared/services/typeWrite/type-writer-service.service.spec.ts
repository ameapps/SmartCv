import { TestBed } from '@angular/core/testing';

import { TypeWriterServiceService } from './type-writer-service.service';

describe('TypeWriterServiceService', () => {
  let service: TypeWriterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeWriterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
