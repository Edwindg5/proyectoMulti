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

  updateItem(itemId: number, itemData: Partial<Item>): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/items/${itemId}`, itemData);
  }

  deleteItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/items/${itemId}`);
  }
}
