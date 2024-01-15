import { TestBed } from '@angular/core/testing';

import { IstoricComandaService } from './istoric-comanda.service';

describe('IstoricComandaService', () => {
  let service: IstoricComandaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IstoricComandaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
