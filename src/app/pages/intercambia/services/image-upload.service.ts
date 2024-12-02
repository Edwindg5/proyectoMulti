import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  requestExchange(exchangeData: { building: string; description: string; userArticle: any; exchangeImage: string | null; requesterId: any; ownerId: any; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000/upload'; // Cambia por la URL de tu backend

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiUrl, formData);
  }
}
