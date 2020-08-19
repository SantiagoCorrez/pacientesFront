import { TestBed } from '@angular/core/testing';

import { AplastarService } from './aplastar.service';

describe('AplastarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AplastarService = TestBed.get(AplastarService);
    expect(service).toBeTruthy();
  });
});
