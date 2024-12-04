import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { SearchService } from '../../services/search.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchTerm: string = ''; // Almacena el término de búsqueda
  searchResults: any[] = []; // Almacena los resultados de búsqueda
  isAuthenticated = false;
  isAdmin: boolean = false;  // Verificar si el usuario es admin
  menuVisible = false;
  notificationsVisible = false; // Controla la visibilidad del panel de notificaciones
  searchItems: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private searchService: SearchService
  ) {
    this.searchItems = new FormGroup({
      term: new FormControl([''])
    });

  }

  ngOnInit(): void {
    
    this.isAuthenticated = this.authService.isAuthenticated();
  
    if (this.isAuthenticated) {
      const username = this.authService.getUserName();
      const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
   
  
      // Verificar si el usuario es administrador
      this.isAdmin = username === 'Administrador';
    }
  }
  
  acceptTrade(notification: any): void {
    const storedExchanges = JSON.parse(localStorage.getItem('exchangeRequests') || '[]');
    const exchange = storedExchanges.find((e: any) => e.articulo_solicitado_id === notification.tradeId);
    
    if (!exchange) {
      Swal.fire('Error', 'No se encontró el intercambio.', 'error');
      return;
    }
  
    exchange.estado = 'accepted';
    localStorage.setItem('exchangeRequests', JSON.stringify(storedExchanges));
  
    // Actualizar notificación como leída
    notification.leido = true;
  
  
    Swal.fire('Éxito', 'Intercambio aceptado.', 'success');
  }
  
  rejectTrade(notification: any): void {
    const storedExchanges = JSON.parse(localStorage.getItem('exchangeRequests') || '[]');
    const exchange = storedExchanges.find((e: any) => e.articulo_solicitado_id === notification.tradeId);
    
    if (!exchange) {
      Swal.fire('Error', 'No se encontró el intercambio.', 'error');
      return;
    }
  
    exchange.estado = 'rejected';
    localStorage.setItem('exchangeRequests', JSON.stringify(storedExchanges));
  
    // Actualizar notificación como leída
    notification.leido = true;

  
    Swal.fire('Intercambio rechazado', 'Has rechazado la solicitud de intercambio.', 'info');
  }
  
  

  navigateToCategory(categoryName: string): void {
    const route = categoryName.toLowerCase().replace(' ', '-'); // Convierte espacios a guiones
    this.router.navigate([`/${route}`]);
  }
  

  searchItemsByName(): void {
    const term = this.searchItems.value.term;  
    localStorage.setItem('termToSearch', term);  
    this.router.navigate(['/busqueda']);
  }
  

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  toggleNotifications(): void {
    this.router.navigate(['/solicit'])
    this.notificationsVisible = !this.notificationsVisible;

  }

  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }

  navigateToLogin(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tu sesión será cerrada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  }


  onClickDetalles(item: any): void {
    Swal.fire({
      title: item.nombre_articulo,
      html: `
        <p><strong>Categoría:</strong> ${item.categoria}</p>
        <p><strong>Descripción:</strong> ${item.descripcion}</p>
        <p><strong>Precio:</strong> $${item.precio}</p>
      `,
      imageUrl: item.url_imagen,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Imagen del producto',
    });
  }
}
