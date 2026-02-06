import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest, User, TokenPayload } from '../models/user.model';
import { environment } from '../../environments/environment';

// Servicio para manejar la autenticación según la guía
@Injectable({
  providedIn: 'root' // Este servicio está disponible en toda la aplicación
})
export class AuthService {
  // URL de la API - Se obtiene del archivo de configuración
  private apiUrl = environment.apiUrl;

  // Subject para notificar cuando el usuario cambia (login/logout)
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Al iniciar, verificamos si hay un usuario guardado en localStorage
    this.loadUserFromStorage();
  }

  /**
   * Carga el usuario y token desde localStorage al iniciar la app
   */
  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error al cargar usuario del localStorage:', error);
        this.logout();
      }
    }
  }

  /**
   * Login - Envía email y password al backend
   * El backend debe devolver un token JWT y la información del usuario
   */
  login(loginData: LoginRequest): Observable<AuthResponse> {
    // IMPORTANTE: Cuando tengas el backend real, cambia esta URL
    // por ejemplo: `${this.apiUrl}/auth/login`

    // Por ahora simulamos la respuesta porque usamos una API falsa
    return this.http.post<AuthResponse>(`${this.apiUrl}/users`, loginData)
      .pipe(
        tap(response => {
          // Guardamos el token y usuario
          this.saveAuthData(response.token, response.user);
        }),
        catchError(error => {
          console.error('Error en login:', error);
          throw error;
        })
      );
  }

  /**
   * Register - Registra un nuevo usuario
   * El backend debe crear el usuario y devolver token + información
   */
  register(registerData: RegisterRequest): Observable<AuthResponse> {
    // IMPORTANTE: Cuando tengas el backend real, cambia esta URL
    // por ejemplo: `${this.apiUrl}/auth/register`

    // Por ahora simulamos la respuesta
    return this.http.post<AuthResponse>(`${this.apiUrl}/users`, registerData)
      .pipe(
        tap(response => {
          // Guardamos el token y usuario
          this.saveAuthData(response.token, response.user);
        }),
        catchError(error => {
          console.error('Error en registro:', error);
          throw error;
        })
      );
  }

  /**
   * Guarda el token y usuario en localStorage y actualiza el subject
   */
  private saveAuthData(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * Logout - Limpia los datos de autenticación
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth']);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Opcionalmente, aquí podrías verificar si el token ha expirado
    // decodificando el JWT y revisando el campo 'exp'
    return true;
  }

  /**
   * Obtiene el token del localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Obtiene el rol del usuario actual
   */
  getUserRole(): 'USER' | 'ADMIN' | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(role: 'USER' | 'ADMIN'): boolean {
    return this.getUserRole() === role;
  }

  /**
   * Decodifica el token JWT (simple, sin librería)
   * En producción, considera usar una librería como jwt-decode
   */
  private decodeToken(token: string): TokenPayload | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }

  /**
   * Verifica si el token ha expirado
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decoded = this.decodeToken(token);
    if (!decoded) return true;

    const now = Date.now() / 1000; // Fecha actual en segundos
    return decoded.exp < now;
  }
}
