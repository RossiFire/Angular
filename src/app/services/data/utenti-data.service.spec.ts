import { TestBed } from '@angular/core/testing';
import { UtentiDataService } from './utenti-data.service';

describe('UtentiDataService', () => {
  let service: UtentiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtentiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
