import { TestBed } from '@angular/core/testing';

import { PrenotazioniDataServiceService } from './prenotazioni-data-service.service';

describe('PrenotazioniDataServiceService', () => {
  let service: PrenotazioniDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrenotazioniDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
