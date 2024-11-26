import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../header/component/header/header.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-renta',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './renta.component.html',  
  styleUrl: './renta.component.css'
})
export class RentaComponent implements OnInit {
  product: any = null;
  tiempo: number | null = null; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedProduct = localStorage.getItem('selectedProduct');
    this.product = storedProduct ? JSON.parse(storedProduct) : null;

    if (!this.product) {
      console.warn('No se encontró información del producto.');
    } else {
      console.log('Producto cargado desde localStorage:', this.product);
    }
  }

  goBack(): void {
    this.router.navigate(['/material-estudio']); // Redirige a la página anterior
  }

  submitRentalRequest(): void {
    if (this.tiempo && this.tiempo > 0) {
      alert(`Has solicitado rentar "${this.product?.nombre_articulo}" por ${this.tiempo} horas.`);

    } else {
      alert('Por favor, ingresa un tiempo válido para la renta.');
    }
  }
}
