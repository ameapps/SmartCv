import { TestBed } from '@angular/core/testing';

import { CloudConfigService } from './cloud-config.service';

describe('CloudConfigService', () => {
  let service: CloudConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
