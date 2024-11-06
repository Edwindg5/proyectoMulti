import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntercambiaComponent } from './intercambia.component';

describe('IntercambiaComponent', () => {
  let component: IntercambiaComponent;
  let fixture: ComponentFixture<IntercambiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntercambiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntercambiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
