import { TestBed } from '@angular/core/testing';

import { SolicitudcitasService } from './solicitudcitas.service';

describe('SolicitudcitasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolicitudcitasService = TestBed.get(SolicitudcitasService);
    expect(service).toBeTruthy();
  });
});
