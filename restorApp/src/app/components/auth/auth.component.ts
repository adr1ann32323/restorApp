import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  // Signal para controlar si mostramos login o registro
  isLogin = signal(true);

  // Variables para los formularios (usamos signals para que Angular detecte los cambios)
  fullName = signal('');
  email = signal('');
  role = signal('User');

  // Variable para mostrar mensajes de error o éxito
  message = signal('');

  // Variable para mostrar el estado de carga
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Función para cambiar entre login y registro
  toggleMode() {
    this.isLogin.set(!this.isLogin());
    this.message.set(''); // Limpiamos mensajes
  }

  // Función para manejar el envío del formulario de login
  async onLogin() {
    // Validamos que los campos no estén vacíos
    if (!this.fullName() || !this.email() || !this.role()) {
      this.message.set('Por favor, completa todos los campos');
      return;
    }

    // Validamos que el email tenga formato correcto
    if (!this.email().includes('@')) {
      this.message.set('Por favor, ingresa un email válido');
      return;
    }

    this.loading.set(true);
    this.message.set('');

    // Llamamos al servicio de autenticación
    const result = await this.authService.login(
      this.email(),
      this.fullName(),
      this.role()
    );

    this.loading.set(false);

    if (result.success) {
      this.message.set('¡Inicio de sesión exitoso! Token: ' + result.token);
      console.log('Token guardado:', result.token);

      // Aquí puedes redirigir a otra página después del login
      // setTimeout(() => {
      //   this.router.navigate(['/dashboard']);
      // }, 2000);
    } else {
      this.message.set(result.error || 'Error al iniciar sesión');
    }
  }

  // Función para manejar el envío del formulario de registro
  async onRegister() {
    // Validamos que los campos no estén vacíos
    if (!this.fullName() || !this.email() || !this.role()) {
      this.message.set('Por favor, completa todos los campos');
      return;
    }

    // Validamos que el email tenga formato correcto
    if (!this.email().includes('@')) {
      this.message.set('Por favor, ingresa un email válido');
      return;
    }

    this.loading.set(true);
    this.message.set('');

    // Llamamos al servicio de autenticación
    const result = await this.authService.register(
      this.email(),
      this.fullName(),
      this.role()
    );

    this.loading.set(false);

    if (result.success) {
      this.message.set('¡Registro exitoso! Token: ' + result.token);
      console.log('Token guardado:', result.token);

      // Aquí puedes redirigir a otra página después del registro
      // setTimeout(() => {
      //   this.router.navigate(['/dashboard']);
      // }, 2000);
    } else {
      this.message.set(result.error || 'Error al registrarse');
    }
  }
}
