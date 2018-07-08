import { TestBed, inject } from '@angular/core/testing';

import { OltprovisionService } from './oltprovision.service';

describe('OltprovisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OltprovisionService]
    });
  });

  it('should be created', inject([OltprovisionService], (service: OltprovisionService) => {
    expect(service).toBeTruthy();
  }));
});
