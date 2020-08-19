import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryemailComponent } from './recoveryemail.component';

describe('RecoveryemailComponent', () => {
  let component: RecoveryemailComponent;
  let fixture: ComponentFixture<RecoveryemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
