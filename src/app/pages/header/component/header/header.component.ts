import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  notifications = [
    { message: 'Nueva oferta en Electrónica' },
    { message: 'Tu pedido ha sido enviado' },
  ];
  unreadNotifications = this.notifications.length;

  constructor(
    private authService: AuthService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // Verifica si el usuario está autenticado
    this.isAuthenticated = this.authService.isAuthenticated();
    
    // Si el usuario está autenticado, verifica su rol
    if (this.isAuthenticated) {
      this.isAdmin = this.authService.getRole() === 'ADMIN';  // Verifica si el usuario es un administrador
      const username = this.authService.getUserName();
      
      // Muestra mensaje de bienvenida
      Swal.fire({
        title: `¡Hola, ${username || 'Usuario'}!`,
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }

  navigateToCategory(categoryName: string): void {
    const route = categoryName.toLowerCase().replace(' ', '-'); // Convierte espacios a guiones
    this.router.navigate([`/${route}`]);
  }
  

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.searchService.searchItems(this.searchTerm).subscribe(
        (results) => {
          this.searchResults = results;
        },
        (error) => {
          console.error('Error en la búsqueda:', error);
          this.searchResults = []; // Limpia los resultados si hay error
        }
      );
    } else {
      this.searchResults = []; // Limpia los resultados si no hay texto
    }
  }
  

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  toggleNotifications(): void {
    this.notificationsVisible = !this.notificationsVisible;
    if (this.notificationsVisible) {
      this.unreadNotifications = 0; // Marcar notificaciones como leídas
    }
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
}
