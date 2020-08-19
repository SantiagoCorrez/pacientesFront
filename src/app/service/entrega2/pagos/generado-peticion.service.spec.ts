import { TestBed } from '@angular/core/testing';

import { GeneradoPeticionService } from './generado-peticion.service';

describe('GeneradoPeticionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneradoPeticionService = TestBed.get(GeneradoPeticionService);
    expect(service).toBeTruthy();
  });
});
