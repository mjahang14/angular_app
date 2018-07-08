import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OltprovisionComponent } from './oltprovision.component';

describe('OltprovisionComponent', () => {
  let component: OltprovisionComponent;
  let fixture: ComponentFixture<OltprovisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OltprovisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OltprovisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
