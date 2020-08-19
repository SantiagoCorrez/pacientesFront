import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreradicacionComponent } from './preradicacion.component';

describe('PreradicacionComponent', () => {
  let component: PreradicacionComponent;
  let fixture: ComponentFixture<PreradicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreradicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreradicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
