import { Injectable } from '@angular/core';

// Servicio simple para manejar la autenticación
@Injectable({
  providedIn: 'root' // Este servicio está disponible en toda la aplicación
})
export class AuthService {
  // URL falsa para pruebas (puedes cambiarla después por tu API real)
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  // Aquí guardamos el token cuando el usuario inicia sesión
  private token: string | null = null;

  constructor() {
    // Al iniciar, revisamos si hay un token guardado
    this.token = localStorage.getItem('token');
  }

  // Función para hacer login
  async login(email: string, name: string, role: string): Promise<any> {
    try {
      // Hacemos la petición a la API falsa
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, role })
      });

      const data = await response.json();

      // Simulamos un token (en una API real, el servidor te lo enviaría)
      const fakeToken = 'token_' + Math.random().toString(36).substr(2, 9);

      // Guardamos el token
      this.token = fakeToken;
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify({ email, name, role }));

      return { success: true, token: fakeToken, user: data };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: 'Error al iniciar sesión' };
    }
  }

  // Función para hacer registro
  async register(email: string, name: string, role: string): Promise<any> {
    try {
      // Hacemos la petición a la API falsa
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, role })
      });

      const data = await response.json();

      // Simulamos un token
      const fakeToken = 'token_' + Math.random().toString(36).substr(2, 9);

      // Guardamos el token
      this.token = fakeToken;
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify({ email, name, role }));

      return { success: true, token: fakeToken, user: data };
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: 'Error al registrarse' };
    }
  }

  // Función para cerrar sesión
  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Función para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.token !== null;
  }

  // Función para obtener el token
  getToken(): string | null {
    return this.token;
  }
}
