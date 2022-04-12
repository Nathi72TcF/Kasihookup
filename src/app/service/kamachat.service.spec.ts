import { TestBed } from '@angular/core/testing';

import { KamachatService } from './kamachat.service';

describe('KamachatService', () => {
  let service: KamachatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KamachatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
