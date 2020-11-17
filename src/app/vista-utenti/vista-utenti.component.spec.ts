import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaUtentiComponent } from './vista-utenti.component';

describe('VistaUtentiComponent', () => {
  let component: VistaUtentiComponent;
  let fixture: ComponentFixture<VistaUtentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaUtentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
