import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/`);
  }
  
  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/items?categoryId=${categoryId}`);
  }
  createArticle(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/items/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  
  
}
