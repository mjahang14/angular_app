import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkprovisionComponent } from './bulkprovision.component';

describe('BulkprovisionComponent', () => {
  let component: BulkprovisionComponent;
  let fixture: ComponentFixture<BulkprovisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkprovisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkprovisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
