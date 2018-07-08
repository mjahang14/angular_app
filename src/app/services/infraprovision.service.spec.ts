import { TestBed, inject } from '@angular/core/testing';

import { InfraprovisionService } from './infraprovision.service';

describe('InfraprovisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfraprovisionService]
    });
  });

  it('should be created', inject([InfraprovisionService], (service: InfraprovisionService) => {
    expect(service).toBeTruthy();
  }));
});
