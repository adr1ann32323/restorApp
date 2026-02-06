import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * NoAuthGuard - Protege rutas que NO deben ser accesibles si ya estás logueado
 * 
 * Verifica si el usuario ya está logueado
 * Si está logueado, redirige según su rol (ADMIN → /admin/dashboard, USER → /products)
 * 
 * Uso en rutas:
 * {
 *   path: 'auth/login',
 *   component: AuthComponent,
 *   canActivate: [noAuthGuard]
 * }
 */
export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario NO está autenticado, permitimos acceso a login/register
  if (!authService.isAuthenticated()) {
    return true;
  }

  // Si ya está autenticado, redirigimos según su rol
  const userRole = authService.getUserRole();
  
  console.log('Usuario ya autenticado, redirigiendo...');
  
  if (userRole === 'ADMIN') {
    router.navigate(['/admin/dashboard']);
  } else {
    router.navigate(['/products']); // O la ruta principal para usuarios
  }
  
  return false;
};
