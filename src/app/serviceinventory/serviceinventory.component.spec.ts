import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceinventoryComponent } from './serviceinventory.component';

describe('ServiceinventoryComponent', () => {
  let component: ServiceinventoryComponent;
  let fixture: ComponentFixture<ServiceinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
