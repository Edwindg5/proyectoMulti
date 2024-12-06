import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchsService } from '../../services/searchs.service';
import { CommonModule } from '@angular/common';
import { CardProductSearchComponent } from '../card-product-search/card-product-search.component';

@Component({
  selector: 'app-section-busqueda',
  standalone: true,
  imports: [
    CommonModule,
    CardProductSearchComponent,
  ],
  templateUrl: './section-busqueda.component.html',
  styleUrl: './section-busqueda.component.css',
})
export class SectionBusquedaComponent implements OnInit {
  constructor(private route: ActivatedRoute, private searchService: SearchsService) {}

  name: string = '';
  items: any[] = [];

  ngOnInit() {
    // Escucha cambios en los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      this.name = params['term'] || '';
      if (this.name) {
        this.searchService.getItemsByName(this.name).subscribe(items => {
          this.items = items;
        });
      }
    });
  }
}
