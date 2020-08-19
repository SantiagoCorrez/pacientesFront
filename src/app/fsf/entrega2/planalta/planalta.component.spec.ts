import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanaltaComponent } from './planalta.component';

describe('PlanaltaComponent', () => {
  let component: PlanaltaComponent;
  let fixture: ComponentFixture<PlanaltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanaltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
