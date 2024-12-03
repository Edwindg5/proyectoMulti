import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMysolicitComponent } from './card-mysolicit.component';

describe('CardMysolicitComponent', () => {
  let component: CardMysolicitComponent;
  let fixture: ComponentFixture<CardMysolicitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMysolicitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMysolicitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
