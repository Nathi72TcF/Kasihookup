import { TestBed } from '@angular/core/testing';

import { FeedchatService } from './feedchat.service';

describe('FeedchatService', () => {
  let service: FeedchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
