import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracioppComponent } from './integraciopp.component';

describe('IntegracioppComponent', () => {
  let component: IntegracioppComponent;
  let fixture: ComponentFixture<IntegracioppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegracioppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegracioppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
