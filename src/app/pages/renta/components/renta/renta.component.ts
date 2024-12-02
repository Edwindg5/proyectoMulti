import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../header/component/header/header.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-renta',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './renta.component.html',
  styleUrl: './renta.component.css'
})
export class RentaComponent implements OnInit {
  product: any = null; // Variable para almacenar los datos del producto

  ngOnInit(): void {
    const storedProduct = localStorage.getItem('selectedProduct');
    this.product = storedProduct ? JSON.parse(storedProduct) : null;

    if (!this.product) {
      console.warn('No se encontró información del producto.');
    } else {
      console.log('Producto cargado desde localStorage:', this.product);
    }
  }
  onPurchaseClick(): void {
    if (!this.product) {
      console.warn('No se puede realizar la compra. Información del producto no encontrada.');
      return;
    }
  
    const { userPhone, userName, nombre_articulo } = this.product;
  
    Swal.fire({
      title: `Contactar a ${userName}`,
      html: `
        <p><strong>Artículo:</strong> ${nombre_articulo}</p>
        <p><strong>Teléfono:</strong> ${userPhone}</p>
        <p>Elige una opción para contactar al vendedor:</p>
        <div style="display: flex; justify-content: center; gap: 10px;">
          <button id="call-btn" class="swal2-confirm swal2-styled" style="background-color: #6ca8d8;">
            Llamar <i class="fa fa-phone"></i>
          </button>
          <button id="whatsapp-btn" class="swal2-confirm swal2-styled" style="background-color: #25D366;">
            WhatsApp <i class="fa fa-whatsapp"></i>
          </button>
        </div>
      `,
      showConfirmButton: false,
      didOpen: () => {
        const callButton = document.getElementById('call-btn');
        const whatsappButton = document.getElementById('whatsapp-btn');
  
        callButton?.addEventListener('click', () => {
          window.location.href = `tel:${userPhone}`;
        });
  
        whatsappButton?.addEventListener('click', () => {
          window.open(`https://wa.me/${userPhone}?text=Hola,%20estoy%20interesado%20en%20tu%20artículo%20${encodeURIComponent(nombre_articulo)}`, '_blank');
        });
      },
    });
  }
  
}
