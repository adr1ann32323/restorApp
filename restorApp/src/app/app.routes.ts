import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  // Ruta principal: cuando entras a la app, te lleva a /auth/login
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  // Rutas de autenticación según la guía
  // NoAuthGuard: Si ya estás logueado, te redirige a tu dashboard
  {
    path: 'auth/login',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent),
    canActivate: [noAuthGuard]
  },

  // Redirección de /auth a /auth/login
  { path: 'auth', redirectTo: '/auth/login', pathMatch: 'full' },

  // Rutas de Administración
  // AuthGuard: Verifica que estés logueado
  // RoleGuard: Verifica que tengas rol ADMIN
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'admin/orders',
    loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },

  // Redirigir /admin a /admin/dashboard
  { path: 'admin', redirectTo: '/admin/dashboard', pathMatch: 'full' },

  // Página de no autorizado
  {
    path: 'unauthorized',
    loadComponent: () => import('./components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },

  // Rutas futuras (descomentar cuando estén implementadas):
  // {
  //   path: 'products',
  //   loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent),
  //   canActivate: [authGuard]
  // },
  // {
  //   path: 'admin/products',
  //   loadComponent: () => import('./components/admin/products/products.component').then(m => m.ManageProductsComponent),
  //   canActivate: [authGuard, roleGuard],
  //   data: { roles: ['ADMIN'] }
  // },
  // {
  //   path: 'admin/users',
  //   loadComponent: () => import('./components/admin/users/users.component').then(m => m.ManageUsersComponent),
  //   canActivate: [authGuard, roleGuard],
  //   data: { roles: ['ADMIN'] }
  // },

  // Ruta 404 - Cualquier otra ruta no encontrada
  { path: '**', redirectTo: '/auth/login' }
];
