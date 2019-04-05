import { TestBed } from '@angular/core/testing';

import { GlobalutilService } from './globalutil.service';

describe('GlobalutilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalutilService = TestBed.get(GlobalutilService);
    expect(service).toBeTruthy();
  });
});
