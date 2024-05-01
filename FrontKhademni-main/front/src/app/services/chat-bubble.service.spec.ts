import { TestBed } from '@angular/core/testing';

import { ChatBubbleService } from './chat-bubble.service';

describe('ChatBubbleService', () => {
  let service: ChatBubbleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatBubbleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
