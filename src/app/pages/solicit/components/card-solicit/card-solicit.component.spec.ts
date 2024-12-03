import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSolicitComponent } from './card-solicit.component';

describe('CardSolicitComponent', () => {
  let component: CardSolicitComponent;
  let fixture: ComponentFixture<CardSolicitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSolicitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSolicitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
