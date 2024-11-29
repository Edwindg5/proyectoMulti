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
  getAllArticles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items/`);
  }
  
  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/items?categoryId=${categoryId}`);
  }
  
  createArticle(articleData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    return this.http.post(`${this.apiUrl}/items/`, articleData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Añade el token en los encabezados
      },
    });
  }
  verifyUserByNameAndEmail(name: string, email: string): Observable<{ exists: boolean; userId?: number }> {
    const body = { name, email };
    return this.http.post<{ exists: boolean; userId?: number }>(
      `${this.apiUrl}/users/verify`,
      body
    );
  }
  
  
  
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload`, formData); // Cambia a `/upload`
  }
  
}
