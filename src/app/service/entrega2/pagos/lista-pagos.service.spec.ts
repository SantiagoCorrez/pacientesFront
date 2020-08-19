import { TestBed } from '@angular/core/testing';
import { ListaPagosService } from './lista-pagos.service';

describe('ListaPagosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaPagosService = TestBed.get(ListaPagosService);
    expect(service).toBeTruthy();
  });
});
