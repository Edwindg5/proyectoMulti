import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:8000'; // URL base del backend

  constructor(private http: HttpClient) {}



  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items/all`);
  }
  getItemsByCategory(categoryId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items/categories/${categoryId}/items`);
  }

  updateItem(id_articulo: number, data: Partial<Item>): Observable<any> {
    return this.http.put(`${this.apiUrl}/items/${id_articulo}`, data);
  }
  
  deleteItem(itemId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token no está disponible.');
    }
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.delete(`${this.apiUrl}/items/${itemId}`, { headers });
  }
  
    
  getAllArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/articles`);
  }
  createArticle(data: Partial<Item>): Observable<Item> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token no está disponible.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<Item>(`${this.apiUrl}/articles`, data, { headers });
  }
  
  
}
