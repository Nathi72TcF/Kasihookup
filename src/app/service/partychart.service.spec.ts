import { TestBed } from '@angular/core/testing';

import { PartychartService } from './partychart.service';

describe('PartychartService', () => {
  let service: PartychartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartychartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
