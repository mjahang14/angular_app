import { TestBed, inject } from '@angular/core/testing';

import { BulkprovisionService } from './bulkprovision.service';

describe('BulkprovisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BulkprovisionService]
    });
  });

  it('should be created', inject([BulkprovisionService], (service: BulkprovisionService) => {
    expect(service).toBeTruthy();
  }));
});
