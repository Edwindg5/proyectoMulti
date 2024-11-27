import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html', 
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  isAuthenticated = false; // Variable que guarda el estado de autenticación
  menuVisible = false; // Controla la visibilidad del menú
  

  constructor(
    private authService: AuthService, 
    private router: Router,
    private searchService: SearchService // Servicio para manejar el término de búsqueda
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  
    if (this.isAuthenticated) {
      const username = this.authService.getUserName();
      Swal.fire({
        title: `¡Hola, ${username || 'Usuario'}!`,
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }
  
  
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible; // Mostrar/ocultar menú
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
        this.authService.logout(); // Llama al método de cierre de sesión en el servicio
        this.router.navigate(['/login']); // Redirige al usuario al login
        Swal.fire({
          title: 'Sesión cerrada',
          text: `Has cerrado sesión correctamente.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  }
  onSearch(): void {
    const term = this.searchInput.nativeElement.value;
    this.searchService.updateSearchTerm(term);
  }
  
}
