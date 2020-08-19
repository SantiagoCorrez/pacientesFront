import { TestBed } from '@angular/core/testing';

import { ResultexamenService } from './resultexamen.service';

describe('ResultexamenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultexamenService = TestBed.get(ResultexamenService);
    expect(service).toBeTruthy();
  });
});
