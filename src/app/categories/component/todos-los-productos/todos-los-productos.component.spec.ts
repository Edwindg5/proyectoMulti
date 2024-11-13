import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosLosProductosComponent } from './todos-los-productos.component';

describe('TodosLosProductosComponent', () => {
  let component: TodosLosProductosComponent;
  let fixture: ComponentFixture<TodosLosProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosLosProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosLosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
