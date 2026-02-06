import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta principal: cuando entras a la app, te lleva a /auth/login
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

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

  // Aquí puedes agregar más rutas después, por ejemplo:
  // { path: 'products', loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent) },
  // { path: 'admin/dashboard', loadComponent: () => import('./components/admin/dashboard.component').then(m => m.DashboardComponent) },
];
