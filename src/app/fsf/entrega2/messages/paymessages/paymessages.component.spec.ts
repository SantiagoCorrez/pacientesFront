import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymessagesComponent } from './paymessages.component';

describe('PaymessagesComponent', () => {
  let component: PaymessagesComponent;
  let fixture: ComponentFixture<PaymessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
