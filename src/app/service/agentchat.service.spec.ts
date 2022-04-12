import { TestBed } from '@angular/core/testing';

import { AgentchatService } from './agentchat.service';

describe('AgentchatService', () => {
  let service: AgentchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
