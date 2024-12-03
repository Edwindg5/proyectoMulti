import { TestBed } from '@angular/core/testing';

import { MysolicitsService } from './mysolicits.service';

describe('MysolicitsService', () => {
  let service: MysolicitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MysolicitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
