import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
  profilePictureFile: File | null = null; // Archivo de imagen seleccionado
  profilePictureUrl: string | null = null; // URL de la imagen subida
  imageUploaded: boolean = false; // Verifica si la imagen se subió

  constructor(private http: HttpClient, private router: Router) {}

  // Manejar la selección de archivo
  onFileSelected(event: any) {
    this.profilePictureFile = event.target.files[0];
    this.imageUploaded = false; // Resetear estado de la subida
  }

  // Subir la imagen al servidor
  uploadImage(): void {
    if (this.profilePictureFile) {
      const formData = new FormData();
      formData.append('file', this.profilePictureFile);
  
      Swal.fire({ title: 'Subiendo imagen...', text: 'Por favor, espera.', didOpen: () => Swal.showLoading() });
  
      this.http.post('http://127.0.0.1:8000/upload', formData).subscribe(
        (response: any) => {
          this.profilePictureUrl = response.url; // Guardar la URL
          this.imageUploaded = true; // Confirmar que la imagen fue subida
          Swal.fire({ icon: 'success', title: 'Imagen subida', text: 'Continúa con el registro.' });
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
          Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo subir la imagen.' });
        }
      );
    } else {
      Swal.fire({ icon: 'warning', title: 'Selecciona una imagen', text: 'Sube una imagen antes de continuar.' });
    }
  }
  

  // Manejar el formulario de registro
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Contraseñas no coinciden', text: 'Revisa las contraseñas.' });
      return;
    }
    if (!this.profilePictureUrl || !this.imageUploaded) {
      Swal.fire({ icon: 'warning', title: 'Sube una imagen', text: 'Debes subir una imagen antes de registrarte.' });
      return;
    }
    
  
    const userData = {
      nombre: this.username,
      correo_electronico: this.email,
      contrasena: this.password,
      telefono: this.telefono || null,
      rol: this.rol,
      profile_picture_url: this.profilePictureUrl,
    };
    
  
    this.http.post('http://127.0.0.1:8000/users/users/', userData).subscribe(
      () => {
        Swal.fire({ icon: 'success', title: '¡Registro exitoso!', text: 'Usuario registrado.' }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        console.error('Error al registrar:', error);
        Swal.fire({ icon: 'error', title: 'Error en el registro', text: 'Intenta nuevamente.' });
      }
    );
  }
  

  // Registro del usuario
  registerUser(profilePictureUrl: string | null) {
    const userData = {
      nombre: this.username,
      correo_electronico: this.email,
      contrasena: this.password,
      telefono: this.telefono || null,
      rol: this.rol,
      profile_picture_url: profilePictureUrl, // Incluir la URL de la imagen
    };

    this.http.post('http://127.0.0.1:8000/users/users/', userData).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El usuario ha sido registrado con éxito.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'Hubo un problema al registrar al usuario. Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  // Navegar al login
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Regresar al login
  goBack() {
    this.router.navigate(['/login']);
  }
  uploadImageAndRegister(): void {
    if (this.profilePictureFile) {
      const formData = new FormData();
      formData.append('file', this.profilePictureFile);
      Swal.fire({ title: 'Subiendo imagen...', didOpen: () => Swal.showLoading() });
  
      this.http.post('http://127.0.0.1:8000/upload', formData).subscribe(
        (response: any) => {
          this.profilePictureUrl = response.url;
          this.imageUploaded = true;
  
          // Llamar al registro automáticamente
          this.registerUser(this.profilePictureUrl);
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
          Swal.fire({ icon: 'error', title: 'Error al subir la imagen', text: 'Intenta nuevamente.' });
        }
      );
    } else {
      Swal.fire({ icon: 'warning', title: 'Selecciona una imagen', text: 'Por favor selecciona una imagen antes de continuar.' });
    }
  }
  
}
