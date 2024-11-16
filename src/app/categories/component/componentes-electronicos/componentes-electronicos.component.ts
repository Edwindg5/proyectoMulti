import { Component } from '@angular/core';
import { HeaderComponent } from '../../../pages/header/component/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componentes-electronicos',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './componentes-electronicos.component.html',
  styleUrl: './componentes-electronicos.component.css'
})
export class ComponentesElectronicosComponent {
  products = [
    { name: 'Audífonos Gamer', image: 'assets/audifonos-gamer.png' },
    { name: 'Teclado Mecánico', image: 'assets/teclado-mecanico.png' },
    { name: 'Mouse Inalámbrico', image: 'assets/mouse-inalambrico.png' },
    { name: 'Cámara Web HD', image: 'assets/camara-web-hd.png' }
  ]
}
