import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosexamenesComponent } from './resultadosexamenes.component';

describe('ResultadosexamenesComponent', () => {
  let component: ResultadosexamenesComponent;
  let fixture: ComponentFixture<ResultadosexamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosexamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosexamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
