import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroreComponent } from './errore.component';

describe('ErroreComponent', () => {
  let component: ErroreComponent;
  let fixture: ComponentFixture<ErroreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
