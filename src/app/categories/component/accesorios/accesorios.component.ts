import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../pages/header/component/header/header.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../../auth/auth.service';
import { Item } from '../../models/item.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css'],
})
export class AccesoriosComponent implements OnInit {
  products: Item[] = [];
  filteredProducts: Item[] = [];
  isAuthenticated: boolean = false;
  searchTerm: string = '';

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: 'Debes iniciar sesión para ver esta página.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    const categoryId = 20; // ID de la categoría "Accesorios"
    this.loadItemsByCategory(categoryId);
  }

  loadItemsByCategory(categoryId: number): void {
    this.categoryService.getItemsByCategory(categoryId).subscribe(
      (data: any[]) => {
        this.products = data.map((item) => ({
          id_articulo: item.id_articulo,
          nombre_articulo: item.nombre_articulo,
          descripcion: item.descripcion,
          precio: item.precio,
          usuario_id: item.usuario_id,
          url_imagen: item.url_imagen,
          profile_picture_url: item.user?.profile_picture_url || 'ruta/a/imagen/default.png',
          userName: item.user?.nombre || 'Usuario no especificado',
          userPhone: item.user?.telefono || 'Teléfono no especificado',
        }));
        this.filteredProducts = [...this.products]; // Copia inicial de productos
      },
      (error) => {
        console.error('Error al obtener los artículos:', error);
      }
    );
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) =>
      product.nombre_articulo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  resetFilter(): void {
    this.searchTerm = '';
    this.filteredProducts = [...this.products];
  }
  updateProduct(product: Item): void {
    if (!this.isAuthenticated) {
      Swal.fire({
        icon: 'error',
        title: 'Acción Restringida',
        text: 'Debes iniciar sesión para realizar esta acción.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    Swal.fire({
      title: 'Actualizar producto',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre" value="${product.nombre_articulo}">
        <textarea id="descripcion" class="swal2-input" placeholder="Descripción">${product.descripcion}</textarea>
        <input id="precio" class="swal2-input" type="number" placeholder="Precio" value="${product.precio}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement)?.value.trim();
        const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement)?.value.trim();
        const precioStr = (document.getElementById('precio') as HTMLInputElement)?.value;

        const precio = parseFloat(precioStr);

        if (!nombre || !descripcion || isNaN(precio) || precio <= 0) {
          Swal.showValidationMessage('Todos los campos son obligatorios y el precio debe ser mayor a 0.');
          return null;
        }

        return { nombre_articulo: nombre, descripcion, precio };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const updatedData = result.value;

        this.categoryService.updateItem(product.id_articulo, updatedData).subscribe(
          () => {
            Swal.fire('Actualizado', 'El producto se actualizó correctamente', 'success');
            this.loadItemsByCategory(20); // Vuelve a cargar los datos
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
            Swal.fire('Error', 'No se pudo actualizar el producto.', 'error');
          }
        );
      }
    });
  }

  deleteProduct(product: Item): void {
    if (!this.isAuthenticated) {
      Swal.fire({
        icon: 'error',
        title: 'Acción Restringida',
        text: 'Debes iniciar sesión para realizar esta acción.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    Swal.fire({
      title: `¿Estás seguro de eliminar "${product.nombre_articulo}"?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteItem(product.id_articulo).subscribe(
          () => {
            Swal.fire('Eliminado', 'El producto ha sido eliminado correctamente', 'success');
            this.loadItemsByCategory(20); // Vuelve a cargar los datos
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el producto', 'error');
            console.error('Error al eliminar el producto:', error);
          }
        );
      }
    });
  }
}
