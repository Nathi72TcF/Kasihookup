import { TestBed } from '@angular/core/testing';

import { BookchatService } from './bookchat.service';

describe('BookchatService', () => {
  let service: BookchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
