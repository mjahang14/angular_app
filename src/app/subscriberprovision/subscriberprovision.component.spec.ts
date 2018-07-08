import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberprovisionComponent } from './subscriberprovision.component';

describe('SubscriberprovisionComponent', () => {
  let component: SubscriberprovisionComponent;
  let fixture: ComponentFixture<SubscriberprovisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberprovisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberprovisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
