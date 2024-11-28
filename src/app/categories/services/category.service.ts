import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:8000'; // URL base del backend

  constructor(private http: HttpClient) {}

  getItemsByCategory(categoryId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items/categories/${categoryId}/items`);
  }

  updateItem(id_articulo: number, data: Partial<Item>): Observable<any> {
    return this.http.put(`${this.apiUrl}/items/${id_articulo}`, data);
  }
  
  
  deleteItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${itemId}`);
  }
  
}
