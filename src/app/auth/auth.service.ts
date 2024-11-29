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
   // En el servicio AuthService
login(credentials: { email: string; password: string }): Observable<any> {
  const adminCredentials = { email: 'admin@admin.com', password: '123456' };

  // Verificar si es administrador
  if (credentials.email === adminCredentials.email && credentials.password === adminCredentials.password) {
    const adminUser = {
      name: 'Administrador',
      email: credentials.email,
      role: 'ADMIN',
    };

    const fakeToken = 'fake-admin-token'; // Simula un token para el admin

    localStorage.setItem('user', JSON.stringify(adminUser));
    localStorage.setItem('token', fakeToken); // Guarda el token falso para el admin

    return new Observable(observer => observer.next({ access_token: fakeToken, user: adminUser }));
  }

  // Código para login normal (sin cambios)
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const params = new URLSearchParams({
    email: credentials.email,
    password: credentials.password,
  }).toString();
  return this.http.post(`${this.apiUrl}/users/users/login?${params}`, {}, { headers }).pipe(
    tap((response: any) => {
      const token = response.access_token;
      const user = response.user;
      if (token && user) {
        this.saveToken(token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    })
  );
}

    
    
    // Logout method
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

    // Check if the user is authenticated
    isAuthenticated(): boolean {
      // Verifica si el entorno es el navegador
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return false; // Si no es el navegador, no está autenticado
      }
    
      const token = localStorage.getItem('token');
      if (!token) return false;
    
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(new Date().getTime() / 1000);
        return payload.exp > currentTime;
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
    private getToken(): string {
      const token = localStorage.getItem('token');
      return token || ''; // Si es null, devuelve un string vacío
    }
    
    isLoggedIn(): boolean {
      // Alias de isAuthenticated por compatibilidad
      return this.isAuthenticated();
    }
    getUserId(): number | null {
      const userString = localStorage.getItem('user');
      if (!userString) {
        console.error('Usuario no autenticado: no se encontró información en localStorage.');
        return null;
      }
    
      try {
        const user = JSON.parse(userString);
        return user.id || null;
      } catch (error) {
        console.error('Error al analizar el usuario de localStorage:', error);
        return null;
      }
    }
    getUserName(): string | null {
      const userString = localStorage.getItem('user');
      if (!userString) {
        return null; // Retorna null si no hay información de usuario
      }
    
      try {
        const user = JSON.parse(userString);
        return user.name || 'Usuario'; // Devuelve el nombre del usuario o un valor por defecto
      } catch (error) {
        console.error('Error al analizar el usuario de localStorage:', error);
        return null;
      }
    }
    
    getRole(): string {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.rol || 'USER';
    }
    
    
    
  }
