import { Component } from '@angular/core';
import { HeaderComponent } from '../../../pages/header/component/header/header.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-todos-los-productos',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './todos-los-productos.component.html',
  styleUrl: './todos-los-productos.component.css'
})
export class TodosLosProductosComponent {
  products = [
    { name: 'Audífonos Gamer', image: 'assets/audifonos-gamer.png' },
    { name: 'Teclado Mecánico', image: 'assets/teclado-mecanico.png' },
    { name: 'Mouse Inalámbrico', image: 'assets/mouse-inalambrico.png' },
    { name: 'Cámara Web HD', image: 'assets/camara-web-hd.png' }
  ]
}
