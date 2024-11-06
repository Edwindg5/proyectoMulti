import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router) {}

  // Método para redirigir al formulario de inicio de sesión
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Método para regresar a la vista anterior
  goBack() {
    this.router.navigate(['../']);
  }

  onSubmit() {
    const userData = {
      username: (document.querySelector('input[name="username"]') as HTMLInputElement).value,
      email: (document.querySelector('input[name="email"]') as HTMLInputElement).value,
      password: (document.querySelector('input[name="password"]') as HTMLInputElement).value
    };

    // Guardar los datos en el localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    // Mostrar alerta de registro exitoso sin redirigir automáticamente
    alert('Registro exitoso. Ahora puedes iniciar sesión manualmente.');
  }
}
