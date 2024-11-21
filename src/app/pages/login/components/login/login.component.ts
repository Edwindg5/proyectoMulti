import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  correo_electronico: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLoginClick() {
    const credentials = { 
      email: this.correo_electronico, 
      password: this.contrasena 
    };
  
    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.access_token);
        alert('Inicio de sesión exitoso.');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      },
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }
}
