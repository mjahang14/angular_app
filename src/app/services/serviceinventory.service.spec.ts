import { TestBed, inject } from '@angular/core/testing';

import { ServiceinventoryService } from './serviceinventory.service';

describe('ServiceinventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceinventoryService]
    });
  });

  it('should be created', inject([ServiceinventoryService], (service: ServiceinventoryService) => {
    expect(service).toBeTruthy();
  }));
});
