import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysolicitsComponent } from './mysolicits.component';

describe('MysolicitsComponent', () => {
  let component: MysolicitsComponent;
  let fixture: ComponentFixture<MysolicitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MysolicitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MysolicitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
