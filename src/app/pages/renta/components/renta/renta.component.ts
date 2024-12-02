import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../header/component/header/header.component';


@Component({
  selector: 'app-renta',
  standalone: true,
  imports: [CommonModule, FormsModule,HeaderComponent],
  templateUrl: './renta.component.html',
  styleUrls: ['./renta.component.css'],
})
export class RentaComponent implements OnInit {
  product: any = null;
  renta = {
    startDate: '',
    endDate: '',
    edificio: ''
  };

  ngOnInit(): void {
    const storedProduct = localStorage.getItem('selectedProduct');
    this.product = storedProduct ? JSON.parse(storedProduct) : null;

    if (!this.product) {
      console.warn('No se encontró información del producto.');
    }
  }

  onRequestRental(): void {
    if (!this.renta.startDate || !this.renta.endDate || !this.renta.edificio) {
      Swal.fire('Por favor, complete todos los campos.');
      return;
    }

    Swal.fire({
      title: 'Solicitud enviada',
      html: `
        <p><strong>Correo del propietario:</strong> ${this.product?.userEmail || 'No disponible'}</p>
        <p><strong>Fecha de Inicio:</strong> ${this.renta.startDate}</p>
        <p><strong>Fecha de Devolución:</strong> ${this.renta.endDate}</p>
        <p><strong>Edificio:</strong> ${this.renta.edificio}</p>
      `,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }

  onPurchaseClick(): void {
    if (!this.renta.edificio) {
      Swal.fire('Por favor, seleccione un edificio para la entrega.');
      return;
    }
  
    Swal.fire({
      title: 'Solicitud de compra',
      html: `
        <p><strong>Producto:</strong> ${this.product?.nombre_articulo || 'No disponible'}</p>
        <p><strong>Edificio de Entrega:</strong> ${this.renta.edificio}</p>
      `,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }
  
}
