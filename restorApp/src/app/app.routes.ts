import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta principal: cuando entras a la app, te lleva a /auth
  { path: '', redirectTo: '/auth', pathMatch: 'full' },

  // Ruta para el componente de autenticación (login/registro)
  {
    path: 'auth',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent)
  },

  // Aquí puedes agregar más rutas después, por ejemplo:
  // { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
];
