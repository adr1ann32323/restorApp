import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * RoleGuard - Protege rutas que requieren un rol específico
 * 
 * Verifica si el usuario tiene el rol necesario para acceder
 * Si no tiene el rol, redirige a /unauthorized
 * 
 * Uso en rutas:
 * {
 *   path: 'admin/dashboard',
 *   component: DashboardComponent,
 *   canActivate: [authGuard, roleGuard],
 *   data: { roles: ['ADMIN'] }
 * }
 */
export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtenemos los roles permitidos desde la configuración de la ruta
  const allowedRoles = route.data['roles'] as string[];
  
  // Si no se especificaron roles, permitimos el acceso
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  // Obtenemos el rol del usuario actual
  const userRole = authService.getUserRole();

  // Verificamos si el usuario tiene alguno de los roles permitidos
  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  // Si no tiene el rol necesario, redirigimos a página de no autorizado
  console.log(`Usuario sin permisos. Rol requerido: ${allowedRoles.join(', ')}, Rol actual: ${userRole}`);
  router.navigate(['/unauthorized']);
  
  return false;
};
