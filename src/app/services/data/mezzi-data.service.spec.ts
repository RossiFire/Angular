import { TestBed } from '@angular/core/testing';

import { MezziDataService } from './mezzi-data.service';

describe('MezziDataService', () => {
  let service: MezziDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MezziDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
