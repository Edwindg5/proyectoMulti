import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesElectronicosComponent } from './componentes-electronicos.component';

describe('ComponentesElectronicosComponent', () => {
  let component: ComponentesElectronicosComponent;
  let fixture: ComponentFixture<ComponentesElectronicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentesElectronicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentesElectronicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
