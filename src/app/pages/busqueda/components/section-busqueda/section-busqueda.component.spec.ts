import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBusquedaComponent } from './section-busqueda.component';

describe('SectionBusquedaComponent', () => {
  let component: SectionBusquedaComponent;
  let fixture: ComponentFixture<SectionBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionBusquedaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
