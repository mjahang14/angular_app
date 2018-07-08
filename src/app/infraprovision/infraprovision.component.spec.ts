import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraprovisionComponent } from './infraprovision.component';

describe('InfraprovisionComponent', () => {
  let component: InfraprovisionComponent;
  let fixture: ComponentFixture<InfraprovisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraprovisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraprovisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
