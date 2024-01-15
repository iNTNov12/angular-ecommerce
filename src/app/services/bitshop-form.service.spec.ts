import { TestBed } from '@angular/core/testing';

import { BitshopFormService } from './bitshop-form.service';

describe('BitshopFormService', () => {
  let service: BitshopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitshopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
