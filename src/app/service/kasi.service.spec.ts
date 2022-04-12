import { TestBed } from '@angular/core/testing';

import { KasiService } from './kasi.service';

describe('KasiService', () => {
  let service: KasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
