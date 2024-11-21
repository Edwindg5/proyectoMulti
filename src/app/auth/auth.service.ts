import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Asegúrate de que esta línea esté presente
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private router: Router) {}
  checkAuthentication(): boolean {
    return this.isAuthenticated(); // Llama al método existente
  }
  
  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    const params = new URLSearchParams({
      email: credentials.email,
      password: credentials.password,
    }).toString();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.post(`${this.apiUrl}/users/users/login?${params}`, {}, { headers }).pipe(
      tap((response: any) => {
        const token = response.token;
        if (token) {
          this.saveToken(token);  // Se guarda el token correctamente
        }
        // Asegúrate de que el componente se actualice con el nuevo estado
        this.checkAuthentication();
      })
    );
  }
  // Logout method
  logout(): void {
    // Ensure localStorage is available before accessing it
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false; // Retorna false si estás en SSR
    }
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(new Date().getTime() / 1000);
      return payload.exp > currentTime; // Compara con el tiempo de expiración
    } catch (error) {
      console.error('Token inválido:', error);
      return false;
    }
  }
  

  // Save token to localStorage
  saveToken(token: string): void {
    // Ensure localStorage is available before setting the token
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  // Verify user identity using token
  verifyIdentity(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return new Observable((observer) => {
        observer.error('Token no encontrado');
        observer.complete();
      });
    }
  
    return this.http.get(`${this.apiUrl}/users/users/verify`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  // Verify user by name and email
  verifyUserByNameAndEmail(
    name: string,
    email: string
  ): Observable<{ exists: boolean; userId?: number }> {
    const body = { name, email };
    return this.http.post<{ exists: boolean; userId?: number }>(
      `${this.apiUrl}/users/users/verify`,
      body
    );
  }

  // Helper method to get token with localStorage check
  private getToken(): string | null {
    // Check if localStorage is available
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
  
  isLoggedIn(): boolean {
    // Alias de isAuthenticated por compatibilidad
    return this.isAuthenticated();
  }
}
