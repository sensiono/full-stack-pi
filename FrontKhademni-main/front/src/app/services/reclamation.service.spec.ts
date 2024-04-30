import { ReclamationService } from './reclamation.service';
import { TestBed } from '@angular/core/testing';

describe('ReclamationeService', () => {
  let service: ReclamationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
