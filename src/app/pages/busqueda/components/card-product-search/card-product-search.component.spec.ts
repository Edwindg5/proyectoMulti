import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductSearchComponent } from './card-product-search.component';

describe('CardProductSearchComponent', () => {
  let component: CardProductSearchComponent;
  let fixture: ComponentFixture<CardProductSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProductSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
