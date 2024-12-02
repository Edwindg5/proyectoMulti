import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/component/header/header.component';
import Swal from 'sweetalert2';
import { ImageUploadService } from '../../services/image-upload.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../auth/auth.service';


@Component({
  selector: 'app-intercambia',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './intercambia.component.html',
  styleUrls: ['./intercambia.component.css'],
})
export class IntercambiaComponent implements OnInit {
  product: any = null;
  selectedBuilding = '';
  selectedFile: File | null = null;
  description = '';
  imageUrl: string | null = null;
  http: any;

  

  constructor(
    private router: Router,
    private imageUploadService: ImageUploadService,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    const storedProduct = localStorage.getItem('selectedProduct');
    this.product = storedProduct ? JSON.parse(storedProduct) : null;

    if (!this.product) {
      Swal.fire({
        icon: 'error',
        title: 'Producto no encontrado',
        text: 'Por favor, selecciona un producto para intercambiar.',
      }).then(() => this.router.navigate(['/material-estudio']));
    }
  }

  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.imageUploadService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          console.log('URL de la imagen subida:', response.url);
          this.imageUrl = response.url;
          Swal.fire('Éxito', 'Imagen subida correctamente.', 'success');
        },
        error: (error) => {
          console.error('Error al subir la imagen:', error);
          Swal.fire('Error', 'No se pudo subir la imagen.', 'error');
        },
      });
    }
  }

  isFormValid(): boolean {
    return !!this.selectedBuilding && !!this.description && !!this.imageUrl;
  }

  async requestExchange(): Promise<void> {
    if (!this.isFormValid()) {
      Swal.fire('Error', 'Por favor completa todos los campos antes de continuar.', 'error');
      return;
    }
  
    const userId = this.authService.getUserId();
    if (!userId) {
      Swal.fire('Error', 'No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.', 'error');
      return;
    }
  
    if (!this.product?.userEmail) {
      Swal.fire('Error', 'No se encontró el correo del propietario del artículo.', 'error');
      return;
    }
  
    // Simulación del envío
    Swal.fire({
      title: 'Solicitud Enviada',
      html: `
        <p>La solicitud de intercambio ha sido enviada al propietario del artículo.</p>
        <p><strong>Correo del propietario:</strong> ${this.product.userEmail}</p>
      `,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }
  
  

  goBack(): void {
    this.router.navigate(['/material-estudio']);
  }
}
