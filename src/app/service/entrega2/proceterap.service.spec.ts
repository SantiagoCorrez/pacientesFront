import { TestBed } from '@angular/core/testing';

import { ProceterapService } from './proceterap.service';

describe('ProceterapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProceterapService = TestBed.get(ProceterapService);
    expect(service).toBeTruthy();
  });
});
