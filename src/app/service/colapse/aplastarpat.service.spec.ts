import { TestBed } from '@angular/core/testing';

import { AplastarpatService } from './aplastarpat.service';

describe('AplastarpatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AplastarpatService = TestBed.get(AplastarpatService);
    expect(service).toBeTruthy();
  });
});
