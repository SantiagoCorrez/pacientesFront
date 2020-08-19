import { TestBed } from '@angular/core/testing';

import { AlergiasService } from './alergias.service';

describe('AlergiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlergiasService = TestBed.get(AlergiasService);
    expect(service).toBeTruthy();
  });
});
