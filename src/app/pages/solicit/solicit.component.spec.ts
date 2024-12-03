import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitComponent } from './solicit.component';

describe('SolicitComponent', () => {
  let component: SolicitComponent;
  let fixture: ComponentFixture<SolicitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
