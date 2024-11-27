import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/component/header/header.component';

@Component({
  selector: 'app-renta',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './renta.component.html',
  styleUrl: './renta.component.css'
})
export class RentaComponent implements OnInit {
  product: any = null;

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

}
