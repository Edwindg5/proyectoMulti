import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../pages/header/component/header/header.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css'],
})
export class AccesoriosComponent implements OnInit {
  products: { 
    name: string; 
    description: string; 
    price: number; 
    userName: string; 
    userPhone: string; 
  }[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    const categoryId = 16; // ID para "Accesorios"
    this.categoryService.getItemsByCategory(categoryId).subscribe(
      (data) => {
        this.products = data.map((item: Item) => ({
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
