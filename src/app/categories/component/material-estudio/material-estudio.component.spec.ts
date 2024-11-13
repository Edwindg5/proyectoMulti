import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialEstudioComponent } from './material-estudio.component';

describe('MaterialEstudioComponent', () => {
  let component: MaterialEstudioComponent;
  let fixture: ComponentFixture<MaterialEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialEstudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
