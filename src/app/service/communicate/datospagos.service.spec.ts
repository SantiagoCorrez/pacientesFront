import { TestBed } from '@angular/core/testing';

import { DatospagosService } from './datospagos.service';

describe('DatospagosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatospagosService = TestBed.get(DatospagosService);
    expect(service).toBeTruthy();
  });
});
