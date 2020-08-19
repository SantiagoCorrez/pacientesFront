import { TestBed } from '@angular/core/testing';

import { DatospacienteService } from './datospaciente.service';

describe('DatospacienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatospacienteService = TestBed.get(DatospacienteService);
    expect(service).toBeTruthy();
  });
});
