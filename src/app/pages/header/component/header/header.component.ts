import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false; // Variable que guarda el estado de autenticación
  menuVisible = false;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated(); // Usa el método existente
  }
  
  // Verifica el token del usuario al cargar el componente
  checkAuthentication(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  // Método para navegar a la página específica
  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }

  // Método para navegar a la página de login
  navigateToLogin(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

  // Método para mostrar/ocultar el menú
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  // Método de logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
