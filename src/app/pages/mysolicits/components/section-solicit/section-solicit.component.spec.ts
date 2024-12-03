import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSolicitComponent } from './section-solicit.component';

describe('SectionSolicitComponent', () => {
  let component: SectionSolicitComponent;
  let fixture: ComponentFixture<SectionSolicitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionSolicitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionSolicitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
