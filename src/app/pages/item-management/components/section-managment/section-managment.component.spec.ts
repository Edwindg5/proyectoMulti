import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionManagmentComponent } from './section-managment.component';

describe('SectionManagmentComponent', () => {
  let component: SectionManagmentComponent;
  let fixture: ComponentFixture<SectionManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
