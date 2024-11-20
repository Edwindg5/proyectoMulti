import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../pages/header/component/header/header.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-material-estudio',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './material-estudio.component.html',
  styleUrls: ['./material-estudio.component.css'],
})
export class MaterialEstudioComponent implements OnInit {
  products: { 
    name: string; 
    description: string; 
    price: number; 
    userName: string; 
    userPhone: string; 
  }[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    const categoryId = 19; // ID para "Material de Estudio"

    this.categoryService.getItemsByCategory(categoryId).subscribe(
      (data) => {
        this.products = data.map((item) => ({
          name: item.nombre_articulo,
          description: item.descripcion,
          price: item.precio,
          userName: item.user?.nombre || 'Usuario no especificado',
          userPhone: item.user?.telefono || 'Teléfono no especificado',
        }));
      },
      (error) => {
        console.error('Error al obtener los artículos:', error);
      }
    );
  }
}