import { Routes } from '@angular/router';
// Guards desactivados temporalmente para desarrollo
// import { authGuard } from './guards/auth.guard';
// import { noAuthGuard } from './guards/no-auth.guard';
// import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  // Ruta principal: cuando entras a la app, te lleva a /menu
  { path: '', redirectTo: '/menu', pathMatch: 'full' },

  // ========================================
  // Rutas de Autenticación (SIN GUARDS - Desarrollo)
  // ========================================
  {
    path: 'auth/login',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent)
    // canActivate: [noAuthGuard] // DESACTIVADO PARA DESARROLLO
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent)
    // canActivate: [noAuthGuard] // DESACTIVADO PARA DESARROLLO
  },

  // Redirección de /auth a /auth/login
  { path: 'auth', redirectTo: '/auth/login', pathMatch: 'full' },

  // ========================================
  // Rutas Públicas (SIN GUARDS - Desarrollo)
  // ========================================
  {
    path: 'menu',
    loadComponent: () => import('./components/menu/menu.component').then(m => m.MenuComponent)
    // canActivate: [authGuard] // DESACTIVADO PARA DESARROLLO
  },
  {
    path: 'products',
    redirectTo: '/menu', // Alias para menu
    pathMatch: 'full'
  },

  // ========================================
  // Rutas de Administración (SIN GUARDS - Desarrollo)
  // ========================================
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
    // canActivate: [authGuard, roleGuard], // DESACTIVADO PARA DESARROLLO
    // data: { roles: ['ADMIN'] }
  },

  // ========================================
  // Ruta de No Autorizado
  // ========================================
  {
    path: 'unauthorized',
    loadComponent: () => import('./components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },

  // ========================================
  // Ruta 404 - Página no encontrada
  // ========================================
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
