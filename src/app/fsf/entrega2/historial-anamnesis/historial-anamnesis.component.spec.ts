import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAnamnesisComponent } from './historial-anamnesis.component';

describe('HistorialAnamnesisComponent', () => {
  let component: HistorialAnamnesisComponent;
  let fixture: ComponentFixture<HistorialAnamnesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialAnamnesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAnamnesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
