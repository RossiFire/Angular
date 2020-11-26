import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPrenotazioniComponent } from './form-prenotazioni.component';

describe('FormPrenotazioniComponent', () => {
  let component: FormPrenotazioniComponent;
  let fixture: ComponentFixture<FormPrenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPrenotazioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
