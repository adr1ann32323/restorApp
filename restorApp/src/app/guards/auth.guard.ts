import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard - Protege rutas que requieren autenticación
 * 
 * Verifica si el usuario está logueado (tiene token válido)
 * Si no está logueado, redirige a /auth/login
 * 
 * Uso en rutas:
 * {
 *   path: 'admin/dashboard',
 *   component: DashboardComponent,
 *   canActivate: [authGuard]
 * }
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos si el usuario está autenticado
  if (authService.isAuthenticated()) {
    return true;
  }

  // Si no está autenticado, guardamos la URL a la que intentaba acceder
  // y redirigimos al login
  console.log('Usuario no autenticado, redirigiendo a login...');
  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
  
  return false;
};
