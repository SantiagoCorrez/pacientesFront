import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadodocumentosComponent } from './listadodocumentos.component';

describe('ListadodocumentosComponent', () => {
  let component: ListadodocumentosComponent;
  let fixture: ComponentFixture<ListadodocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadodocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadodocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
