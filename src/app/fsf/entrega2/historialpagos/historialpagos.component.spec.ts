import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialpagosComponent } from './historialpagos.component';

describe('HistorialpagosComponent', () => {
  let component: HistorialpagosComponent;
  let fixture: ComponentFixture<HistorialpagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialpagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialpagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
