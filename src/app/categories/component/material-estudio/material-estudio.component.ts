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
import { ArticleService } from '../../../pages/vende/services/article.service';

@Component({
  selector: 'app-material-estudio',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './material-estudio.component.html',
  styleUrls: ['./material-estudio.component.css'],
})
export class MaterialEstudioComponent implements OnInit, OnDestroy {
  products: Item[] = [];
  filteredProducts: Item[] = [];
  searchTerm: string = '';
  searchSubscription: Subscription | undefined;
  authenticatedUserName: string = '';
  isAuthenticated: boolean;
  articles: any[] = [];  // Arreglo para almacenar los artículos
  isLoading = false;  

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService,
    private searchService: SearchService,
    private articleService: ArticleService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.authenticatedUserName = user.name || '';
    if (!user.id) {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }  
  
  loadAllArticles(): void {
    this.isLoading = true;
    this.categoryService.getAllArticles().subscribe({
      next: (articles) => {
        this.products = articles.map((item) => ({
          ...item,
          url_imagen: item.url_imagen || 'ruta/a/imagen/default.png',
          profile_picture_url: item.user?.profile_picture_url || 'ruta/a/imagen/default.png',
          userName: item.user?.nombre || 'Usuario no especificado',
          userPhone: item.user?.telefono || 'Teléfono no especificado',
        }));
        this.filteredProducts = [...this.products];
      },
      error: () => {
        console.error('Error al cargar los artículos');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }


  ngOnInit(): void {
    this.loadAllArticles(); // Cambio: cargamos todos los artículos
    this.searchSubscription = this.searchService.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
      this.filteredProducts = this.products.filter((product) =>
        (product.nombre_articulo || '').toLowerCase().includes(term.toLowerCase()) ||
        (product.descripcion || '').toLowerCase().includes(term.toLowerCase())
      );
    });
  }
    // Cargar todos los artículos
    loadArticles(): void {
      this.isLoading = true;
      this.articleService.getAllArticles().subscribe({
        next: (articles) => {
          this.articles = articles;
        },
        error: () => {
          console.error('Error al cargar los artículos');
        },
        complete: () => {
          this.isLoading = false;
        },
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
          .filter((item) => item.usuario_id === userId)
          .map((item) => ({
            id_articulo: item.id_articulo,
            nombre_articulo: item.nombre_articulo,
            descripcion: item.descripcion,
            precio: item.precio,
            usuario_id: item.usuario_id,
            url_imagen: item.url_imagen || 'ruta/a/imagen/default.png',
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
  

  getProcessedDescription(description: string): string[][] {
    const features = description.split(',').map((item) => item.trim());
    return [features];
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
            this.loadItemsByCategory(1, userId);
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
    if (product.userName !== this.authenticatedUserName) {
      Swal.fire('Error', 'No tienes permiso para eliminar este artículo.', 'error');
      return;
    }
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el artículo permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteItem(product.id_articulo).subscribe({
          next: () => {
            this.products = this.products.filter((item) => item.id_articulo !== product.id_articulo);
            this.filteredProducts = [...this.products];
            Swal.fire('Eliminado', 'El producto se eliminó correctamente', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar el producto:', error);
            const errorMessage = error.status === 401
              ? 'No estás autorizado para eliminar este producto.'
              : 'No se pudo eliminar el producto. Inténtalo más tarde.';
            Swal.fire('Error', errorMessage, 'error');
          },
        });
      }
    });
  }
  
  

  goToExchange(product: Item): void {
    this.router.navigate([`/intercambiar/${product.id_articulo}`]);
  }

  goToPurchase(product: Item): void {
    this.router.navigate([`/compra/${product.id_articulo}`]);
  }
  onCardClick(): void {
    if (!this.isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para interactuar.',
        confirmButtonText: 'Iniciar Sesión',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
  
  
}
