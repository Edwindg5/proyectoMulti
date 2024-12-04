import { Component } from '@angular/core';
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
  styleUrl: './section-busqueda.component.css'
})
export class SectionBusquedaComponent {
  constructor(private searchService:SearchsService){}
  name :string = '';
  items: any[] = [];
  ngOnInit(){
    const storedName = localStorage.getItem('termToSearch');
    this.name = storedName ? storedName : '';
    this.searchService.getItemsByName(this.name).subscribe(items =>{
      this.items = items;
    })
  } 
}
