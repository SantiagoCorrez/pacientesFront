import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MihistorialpagosComponent } from './mihistorialpagos.component';

describe('MihistorialpagosComponent', () => {
  let component: MihistorialpagosComponent;
  let fixture: ComponentFixture<MihistorialpagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MihistorialpagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MihistorialpagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
