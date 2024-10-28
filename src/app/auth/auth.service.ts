import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() {}

  // Método para iniciar sesión (puede recibir credenciales de usuario)
  login(username: string, password: string): boolean {
    // Aquí iría la lógica para autenticar con el backend.
    // Por ahora, simularemos que el login es exitoso.
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  // Método para cerrar sesión
  logout(): void {
    this.isAuthenticated = false;
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
