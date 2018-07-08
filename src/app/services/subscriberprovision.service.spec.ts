import { TestBed, inject } from '@angular/core/testing';

import { SubscriberprovisionService } from './subscriberprovision.service';

describe('SubscriberprovisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriberprovisionService]
    });
  });

  it('should be created', inject([SubscriberprovisionService], (service: SubscriberprovisionService) => {
    expect(service).toBeTruthy();
  }));
});
