import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  telefono: string = ''; // Campo adicional
  rol: string = 'USER'; // Rol predeterminado

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Crear objeto con los datos del usuario
    const userData = {
      nombre: this.username,
      correo_electronico: this.email,
      contrasena: this.password,
      telefono: this.telefono || null, // Campo opcional
      rol: this.rol // Predeterminado como 'USER'
    };

    // Realizar solicitud POST al backend
    this.http.post('http://127.0.0.1:8000/users/users', userData).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito:', response);
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']); // Redirigir al login después del registro
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
        alert('Hubo un error al registrar el usuario');
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
