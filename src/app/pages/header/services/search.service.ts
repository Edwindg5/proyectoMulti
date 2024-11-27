import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../../categories/models/item.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTerm.asObservable();

  updateSearchTerm(term: string): void {
    this.searchTerm.next(term);
  }

  getFilteredProducts(term: string, products: Item[]): Item[] {
    const lowerTerm = term.toLowerCase();
    return products.filter(
      (product) =>
        product.nombre_articulo.toLowerCase().startsWith(lowerTerm) || // Comienza con
        product.nombre_articulo.toLowerCase().includes(lowerTerm) // Contiene el término
    );
  }
}
