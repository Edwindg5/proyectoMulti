import { Component } from '@angular/core';
import { HeaderComponent } from '../../../pages/header/component/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-material-estudio',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './material-estudio.component.html',
  styleUrl: './material-estudio.component.css'
})
export class MaterialEstudioComponent {
  products = [
    { name: 'Audífonos Gamer', image: 'assets/audifonos-gamer.png' },
    { name: 'Teclado Mecánico', image: 'assets/teclado-mecanico.png' },
    { name: 'Mouse Inalámbrico', image: 'assets/mouse-inalambrico.png' },
    { name: 'Cámara Web HD', image: 'assets/camara-web-hd.png' }
  ]
}
