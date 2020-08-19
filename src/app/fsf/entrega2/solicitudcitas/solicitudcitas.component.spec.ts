import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudcitasComponent } from './solicitudcitas.component';

describe('SolicitudcitasComponent', () => {
  let component: SolicitudcitasComponent;
  let fixture: ComponentFixture<SolicitudcitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudcitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudcitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
