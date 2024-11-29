import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'http://127.0.0.1:8000/items/search';
  private searchTermSubject = new BehaviorSubject<string>(''); // Inicializa con valor vacío
  searchTerm$ = this.searchTermSubject.asObservable(); // Exponer observable

  constructor(private http: HttpClient) {}

  searchItems(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?query=${encodeURIComponent(query)}`);
  }

  // Método para actualizar el término de búsqueda
  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }
}
