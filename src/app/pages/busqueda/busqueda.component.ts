import { Component } from '@angular/core';
import { SectionBusquedaComponent } from './components/section-busqueda/section-busqueda.component';
import { HeaderComponent } from '../header/component/header/header.component';
import { CommonModule } from '@angular/common';
import { SearchsService } from './services/searchs.service';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [SectionBusquedaComponent,HeaderComponent,CommonModule],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {
  

}
