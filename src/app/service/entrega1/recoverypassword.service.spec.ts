import { TestBed } from '@angular/core/testing';

import { RecoverypasswordService } from './recoverypassword.service';

describe('RecoverypasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecoverypasswordService = TestBed.get(RecoverypasswordService);
    expect(service).toBeTruthy();
  });
});
