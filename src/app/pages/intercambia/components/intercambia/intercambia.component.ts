import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/component/header/header.component';
import Swal from 'sweetalert2';
import { ImageUploadService } from '../../services/image-upload.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../auth/auth.service';
import { ModalComponent } from '../../../solicit/components/modal/modal.component';
import { SolicitService } from '../../../solicit/services/solicit.service';
import { filter, map, tap } from 'rxjs';
import { ButtonModule } from 'primeng/button';

interface Item {
  estado: string;
}

@Component({
  selector: 'app-intercambia',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule, ButtonModule],
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
  isModal = false;
  idOfer: number = 0;
  itemsByUser: any[] = []
  selectedItem: any = 0;
  

  constructor(
    private router: Router,
    private imageUploadService: ImageUploadService,
    private authService: AuthService,
    
  ) {}

  ngOnInit(): void {
    
    const storedProduct = localStorage.getItem('selectedProduct');
    this.product = storedProduct ? JSON.parse(storedProduct) : null;
    const storedSeller = localStorage.getItem('user');
    this.idOfer = storedSeller ? JSON.parse(storedSeller).id : null;
    this.imageUploadService.getItemsByUser(this.idOfer).pipe(
      //filtrar aquellos que sean dsiponibles
      filter((items) => items && items.some((item: Item) => item.estado === 'DISPONIBLE')),
      tap({
      next: (items) => {
        this.itemsByUser = items
        console.log(this.itemsByUser);
        
      },
      error: (error) => {
        console.error('Error al obtener los items por usuario:', error);
        Swal.fire('Error', 'No se pudieron obtener los items del usuario.', 'error');
      }
    })).subscribe()
    if (!this.product) {
      Swal.fire({
        icon: 'error',
        title: 'Producto no encontrado',
        text: 'Por favor, selecciona un producto para intercambiar.',
      }).then(() => this.router.navigate(['/material-estudio']));
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
  openModal(){
    this.isModal = true;
  }
  solicitInterchange(){
    if(this.selectedItem == 0){
      Swal.fire('Información', 'Por favor selecciona un artículo para intercambiar.', 'info');
      return;
    }


    console.log(this.product);
    const articleSend = {
      usuario_solicitante_id: this.product.user.id_usuario,
      articulo_solicitado_id: this.product.id_articulo,
      articulo_ofrecido_id: this.selectedItem.id_articulo,
      usuario_ofertador_id: this.selectedItem.user.id_usuario,
      estado: 'PENDING'
    }
    this.imageUploadService.sendInterchange(articleSend).pipe(tap({
      next: (response) => {
        console.log('Solicitud enviada:', response);
        Swal.fire('Solicitud Enviada', 'La solicitud de intercambio ha sido enviada con éxito.','success');
      },
      error: (error) => {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire('Error', 'No se pudo enviar la solicitud de intercambio.', 'error');
      }
    })).subscribe()
    
  }

  goBack(): void {
    this.router.navigate(['/material-estudio']);
  }

  closeModal() {
    this.isModal = false;  // Ocultar el modal
  }

  selectItem(item: any) {
    console.log('Artículo seleccionado:', item);
    this.selectedItem = item;
    this.closeModal();

  }
}
