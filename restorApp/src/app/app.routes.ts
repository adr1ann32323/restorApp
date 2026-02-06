import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta principal: cuando entras a la app, te lleva a /menu
  { path: '', redirectTo: '/menu', pathMatch: 'full' },

  // Rutas de autenticación según la guía
  {
    path: 'auth/login',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent)
  },

  // Redirección de /auth a /auth/login
  { path: 'auth', redirectTo: '/auth/login', pathMatch: 'full' },

  // Ruta del menú (productos)
  {
    path: 'menu',
    loadComponent: () => import('./components/menu/menu.component').then(m => m.MenuComponent)
  },

  // Aquí puedes agregar más rutas después, por ejemplo:
  // { path: 'orders', loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent) },
  // { path: 'profile', loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent) },
  // { path: 'admin/dashboard', loadComponent: () => import('./components/admin/dashboard.component').then(m => m.DashboardComponent) },
];
