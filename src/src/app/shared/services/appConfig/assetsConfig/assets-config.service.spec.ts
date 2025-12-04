import { TestBed } from '@angular/core/testing';

import { AssetsConfigService } from './assets-config.service';

describe('AssetsConfigService', () => {
  let service: AssetsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
