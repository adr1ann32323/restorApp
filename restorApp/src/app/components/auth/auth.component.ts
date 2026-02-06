import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest, RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  // Signal para controlar si mostramos login o registro
  isLogin = signal(true);

  // Variables para los formularios (usamos signals)
  name = signal('');
  email = signal('');
  password = signal('');
  role = signal<'USER' | 'ADMIN'>('USER'); // Por defecto USER

  // Variable para mostrar mensajes de error o éxito
  message = signal('');

  // Variable para mostrar el estado de carga
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Al iniciar el componente, detectamos la ruta actual
   */
  ngOnInit() {
    // Si la ruta es /auth/register, mostramos el formulario de registro
    // Si es /auth/login, mostramos el formulario de login
    const currentUrl = this.router.url;
    this.isLogin.set(currentUrl.includes('/login'));
  }

  /**
   * Función para cambiar entre login y registro
   * Ahora cambia la URL en lugar de solo cambiar el signal
   */
  toggleMode() {
    this.message.set(''); // Limpiamos mensajes
    // Limpiamos los campos
    this.name.set('');
    this.email.set('');
    this.password.set('');
    this.role.set('USER');

    // Cambiamos la ruta según el modo actual
    if (this.isLogin()) {
      // Si estamos en login, vamos a register
      this.router.navigate(['/auth/register']);
      this.isLogin.set(false);
    } else {
      // Si estamos en register, vamos a login
      this.router.navigate(['/auth/login']);
      this.isLogin.set(true);
    }
  }

  /**
   * Función para manejar el login
   */
  onLogin() {
    // Validamos que los campos no estén vacíos
    if (!this.email() || !this.password()) {
      this.message.set('Por favor, completa todos los campos');
      return;
    }

    // Validamos que el email tenga formato correcto
    if (!this.email().includes('@')) {
      this.message.set('Por favor, ingresa un email válido');
      return;
    }

    // Validamos que la contraseña tenga al menos 6 caracteres
    if (this.password().length < 6) {
      this.message.set('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    this.loading.set(true);
    this.message.set('');

    // Preparamos los datos para el login
    const loginData: LoginRequest = {
      email: this.email(),
      password: this.password()
    };

    // IMPORTANTE: Como estamos usando una API falsa, simulamos la respuesta
    // Cuando tengas el backend real, esta parte funcionará automáticamente
    this.simulateLogin(loginData);
  }

  /**
   * Función para manejar el registro
   */
  onRegister() {
    // Validamos que los campos no estén vacíos
    if (!this.name() || !this.email() || !this.password()) {
      this.message.set('Por favor, completa todos los campos');
      return;
    }

    // Validamos que el email tenga formato correcto
    if (!this.email().includes('@')) {
      this.message.set('Por favor, ingresa un email válido');
      return;
    }

    // Validamos que la contraseña tenga al menos 6 caracteres
    if (this.password().length < 6) {
      this.message.set('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    this.loading.set(true);
    this.message.set('');

    // Preparamos los datos para el registro
    const registerData: RegisterRequest = {
      name: this.name(),
      email: this.email(),
      password: this.password(),
      role: this.role()
    };

    // IMPORTANTE: Como estamos usando una API falsa, simulamos la respuesta
    // Cuando tengas el backend real, esta parte funcionará automáticamente
    this.simulateRegister(registerData);
  }

  /**
   * SIMULACIÓN de login (solo para pruebas sin backend)
   * ELIMINA ESTA FUNCIÓN cuando tengas el backend real
   */
  private simulateLogin(loginData: LoginRequest) {
    // Simulamos un delay de red
    setTimeout(() => {
      // Creamos un token falso (JWT simulado)
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6IlVTRVIifQ.fake';

      // Creamos un usuario falso
      const fakeUser = {
        id: 1,
        name: 'Usuario de Prueba',
        email: loginData.email,
        role: 'USER' as 'USER' | 'ADMIN'
      };

      // Guardamos en localStorage (simulando lo que haría el servicio)
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(fakeUser));

      this.loading.set(false);
      this.message.set('¡Inicio de sesión exitoso!');

      // Redirigimos después de 1 segundo
      setTimeout(() => {
        // Por ahora redirigimos a la misma página, pero cuando tengas más rutas
        // redirigirás a /products para USER o /admin/dashboard para ADMIN
        console.log('Login exitoso. Token guardado:', fakeToken);
        console.log('Usuario:', fakeUser);
      }, 1000);
    }, 1000);
  }

  /**
   * SIMULACIÓN de registro (solo para pruebas sin backend)
   * ELIMINA ESTA FUNCIÓN cuando tengas el backend real
   */
  private simulateRegister(registerData: RegisterRequest) {
    // Simulamos un delay de red
    setTimeout(() => {
      // Creamos un token falso
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6IlVTRVIifQ.fake';

      // Creamos un usuario falso
      const fakeUser = {
        id: 2,
        name: registerData.name,
        email: registerData.email,
        role: registerData.role || 'USER'
      };

      // Guardamos en localStorage
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(fakeUser));

      this.loading.set(false);
      this.message.set('¡Registro exitoso!');

      // Redirigimos después de 1 segundo
      setTimeout(() => {
        console.log('Registro exitoso. Token guardado:', fakeToken);
        console.log('Usuario:', fakeUser);
      }, 1000);
    }, 1000);
  }

  /**
   * DESCOMENTA ESTE CÓDIGO cuando tengas el backend real:
   *
   * private realLogin(loginData: LoginRequest) {
   *   this.authService.login(loginData).subscribe({
   *     next: (response) => {
   *       this.loading.set(false);
   *       this.message.set('¡Inicio de sesión exitoso!');
   *
   *       // Redirigir según el rol
   *       setTimeout(() => {
   *         const role = this.authService.getUserRole();
   *         if (role === 'ADMIN') {
   *           this.router.navigate(['/admin/dashboard']);
   *         } else {
   *           this.router.navigate(['/products']);
   *         }
   *       }, 1000);
   *     },
   *     error: (error) => {
   *       this.loading.set(false);
   *       this.message.set(error.error?.message || 'Error al iniciar sesión');
   *     }
   *   });
   * }
   *
   * private realRegister(registerData: RegisterRequest) {
   *   this.authService.register(registerData).subscribe({
   *     next: (response) => {
   *       this.loading.set(false);
   *       this.message.set('¡Registro exitoso!');
   *
   *       // Redirigir según el rol
   *       setTimeout(() => {
   *         const role = this.authService.getUserRole();
   *         if (role === 'ADMIN') {
   *           this.router.navigate(['/admin/dashboard']);
   *         } else {
   *           this.router.navigate(['/products']);
   *         }
   *       }, 1000);
   *     },
   *     error: (error) => {
   *       this.loading.set(false);
   *       this.message.set(error.error?.message || 'Error al registrarse');
   *     }
   *   });
   * }
   */
}
