import { TestBed } from '@angular/core/testing';

import { SolicitService } from './solicit.service';

describe('SolicitService', () => {
  let service: SolicitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
