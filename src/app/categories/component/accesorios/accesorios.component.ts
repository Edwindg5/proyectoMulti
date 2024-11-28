import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { Item } from '../../models/item.model';
import { HeaderComponent } from '../../../pages/header/component/header/header.component';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../pages/header/services/search.service';

@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css'],
})
export class AccesoriosComponent implements OnInit {
  products: Item[] = [];
  filteredProducts: Item[] = []; // Productos filtrados
  searchTerm: string = ''; // Término de búsqueda
  searchSubscription: Subscription | undefined;
  constructor(private categoryService: CategoryService, private router: Router, private authService: AuthService, private searchService: SearchService) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
    }
  }
  

  ngOnInit(): void {
    const categoryId = 4; // ID de la categoría
    const userId = parseInt(localStorage.getItem('userId') || '0', 10); // Obtener ID del usuario
    this.loadItemsByCategory(categoryId, userId);
        // Suscribirse al término de búsqueda
        this.searchSubscription = this.searchService.searchTerm$.subscribe((term) => {
          this.searchTerm = term;
          this.filteredProducts = this.products.filter((product) =>
            (product.nombre_articulo || '').toLowerCase().includes(term.toLowerCase()) ||
            (product.descripcion || '').toLowerCase().includes(term.toLowerCase())
          );
          
        });
  }

  loadItemsByCategory(categoryId: number, userId: number): void {
    this.categoryService.getItemsByCategory(categoryId).subscribe(
      (data: any[]) => {
        this.products = data.map((item) => ({
          ...item,
          url_imagen: item.url_imagen || 'ruta/a/imagen/default.png',
          profile_picture_url: item.user?.profile_picture_url || 'ruta/a/imagen/default.png',
          userName: item.user?.nombre || 'Usuario no especificado',
          userPhone: item.user?.telefono || 'Teléfono no especificado',
        }));
        this.products = data
          .filter((item) => item.usuario_id === userId) // Filtrar por usuario
          .map((item) => ({
            id_articulo: item.id_articulo,
            nombre_articulo: item.nombre_articulo,
            descripcion: item.descripcion,
            precio: item.precio,
            usuario_id: item.usuario_id,
            url_imagen: item.url_imagen || 'ruta/a/imagen/default.png', // URL de la imagen
            profile_picture_url: item.user?.profile_picture_url || 'ruta/a/imagen/default.png',
            userName: item.user?.nombre || 'Usuario no especificado',
            userPhone: item.user?.telefono || 'Teléfono no especificado',
          }));
          this.filteredProducts = [...this.products];
      },
      (error) => {
        console.error('Error al obtener los artículos:', error);
      }
    );
    
  }
  onSearch(searchTerm: string): void {
    this.filteredProducts = this.products.filter((product) =>
      product.nombre_articulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  updateProduct(product: Item): void {
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
        const userId = parseInt(localStorage.getItem('userId') || '0', 10);

        this.categoryService.updateItem(product.id_articulo, updatedData).subscribe(
          () => {
            Swal.fire('Actualizado', 'El producto se actualizó correctamente', 'success');
            this.loadItemsByCategory(4, userId); // Vuelve a cargar los datos
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
    Swal.fire({
      title: `¿Estás seguro de eliminar "${product.nombre_articulo}"?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = parseInt(localStorage.getItem('userId') || '0', 10);

        this.categoryService.deleteItem(product.id_articulo).subscribe(
          () => {
            Swal.fire('Eliminado', 'El producto ha sido eliminado correctamente', 'success');
            this.loadItemsByCategory(4, userId); // Vuelve a cargar los datos
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el producto', 'error');
            console.error('Error al eliminar el producto:', error);
          }
        );
      }
    });
  }
goToExchange(product: Item): void {
  localStorage.setItem('selectedProduct', JSON.stringify(product)); // Guardar producto en localStorage
  this.router.navigate(['/intercambia']); // Navegar a la ruta
 
}
goToPurchase(product: Item): void {
  localStorage.setItem('selectedProduct', JSON.stringify(product)); // Guardar producto en localStorage
  this.router.navigate(['/compra']); // Navegar a la ruta de compra
}


}
