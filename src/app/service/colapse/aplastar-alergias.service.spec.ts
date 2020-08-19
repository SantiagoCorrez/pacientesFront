import { TestBed } from '@angular/core/testing';

import { AplastarAlergiasService } from './aplastar-alergias.service';

describe('AplastarAlergiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AplastarAlergiasService = TestBed.get(AplastarAlergiasService);
    expect(service).toBeTruthy();
  });
});
