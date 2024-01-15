import { TestBed } from '@angular/core/testing';

import { ProdusService } from './produs.service';

describe('ProdusService', () => {
  let service: ProdusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
