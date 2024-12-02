import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/component/header/header.component';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'error',
        title: 'Producto no encontrado',
        text: 'Por favor, selecciona un producto para intercambiar.',
      }).then(() => {
        this.router.navigate(['/material-estudio']);
      });
    }
  }
  

  goBack(): void {
    this.router.navigate(['/material-estudio']); // Redirige a la página anterior
  }
}
