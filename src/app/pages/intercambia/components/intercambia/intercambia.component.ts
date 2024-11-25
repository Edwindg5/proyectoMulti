import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/component/header/header.component';

@Component({
  selector: 'app-intercambia',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './intercambia.component.html',
  styleUrls: ['./intercambia.component.css'],
})
export class IntercambiaComponent implements OnInit {
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
