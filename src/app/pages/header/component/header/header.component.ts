import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';
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
  menuVisible = false; // Controla la visibilidad del menú

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated(); // Verifica autenticación
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
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
