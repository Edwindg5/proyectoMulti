import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
        const token = response.access_token;
        const user = response.user;
  
        if (token && user) {
          this.authService.saveToken(token);
          localStorage.setItem('user', JSON.stringify(user));
  
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: `Bienvenido, ${user.name || 'Usuario'}!`,
            confirmButtonText: 'Aceptar',
          });
  
          // Redirigir según el rol del usuario
          if (user.role === 'ADMIN') {
            this.router.navigate(['/users']); // Vista de administración
          } else {
            this.router.navigate(['/home']); // Vista normal
          }
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Verifica tus credenciales e intenta nuevamente.',
          confirmButtonText: 'Aceptar',
        });
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
