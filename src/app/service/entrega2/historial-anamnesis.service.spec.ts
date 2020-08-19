import { TestBed } from '@angular/core/testing';

import { HistorialAnamnesisService } from './historial-anamnesis.service';

describe('HistorialAnamnesisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistorialAnamnesisService = TestBed.get(HistorialAnamnesisService);
    expect(service).toBeTruthy();
  });
});
