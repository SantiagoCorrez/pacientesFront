import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoPagosComponent } from './resultado-pagos.component';

describe('ResultadoPagosComponent', () => {
  let component: ResultadoPagosComponent;
  let fixture: ComponentFixture<ResultadoPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
