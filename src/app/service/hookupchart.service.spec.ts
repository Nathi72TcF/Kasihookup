import { TestBed } from '@angular/core/testing';

import { HookupchartService } from './hookupchart.service';

describe('HookupchartService', () => {
  let service: HookupchartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HookupchartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
