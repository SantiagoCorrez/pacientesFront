import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanaltafromComponent } from './planaltafrom.component';

describe('PlanaltafromComponent', () => {
  let component: PlanaltafromComponent;
  let fixture: ComponentFixture<PlanaltafromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanaltafromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanaltafromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
