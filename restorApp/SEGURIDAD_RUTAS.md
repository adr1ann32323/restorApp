# 🔓 Seguridad de Rutas - Modo Desarrollo

## ⚠️ Estado Actual: SEGURIDAD DESACTIVADA

Todas las rutas están actualmente **SIN PROTECCIÓN** para facilitar el desarrollo y visualización de las vistas.

---

## 🌐 Rutas Accesibles (Sin Autenticación)

Ahora puedes acceder libremente a todas las rutas:

### ✅ Rutas Disponibles:

```bash
# Ruta por defecto (redirige al menú)
http://localhost:4200

# Autenticación
http://localhost:4200/auth/login
http://localhost:4200/auth/register

# Menú de productos
http://localhost:4200/menu
http://localhost:4200/products  # (alias de /menu)

# Administración
http://localhost:4200/admin/dashboard

# Sin permisos
http://localhost:4200/unauthorized
```

---

## 🔒 Para Reactivar la Seguridad

Cuando quieras reactivar la protección de las rutas, sigue estos pasos:

### Paso 1: Editar `app.routes.ts`

Descomenta los imports de los guards:

```typescript
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';      // ✅ Descomentar
import { noAuthGuard } from './guards/no-auth.guard'; // ✅ Descomentar
import { roleGuard } from './guards/role.guard';      // ✅ Descomentar
```

### Paso 2: Cambiar la redirección principal

```typescript
// Cambiar de:
{ path: '', redirectTo: '/menu', pathMatch: 'full' },

// A:
{ path: '', redirectTo: '/auth/login', pathMatch: 'full' },
```

### Paso 3: Reactivar Guards en las Rutas

#### Login y Register:
```typescript
{
  path: 'auth/login',
  loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent),
  canActivate: [noAuthGuard] // ✅ Descomentar
},
{
  path: 'auth/register',
  loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent),
  canActivate: [noAuthGuard] // ✅ Descomentar
}
```

#### Menú:
```typescript
{
  path: 'menu',
  loadComponent: () => import('./components/menu/menu.component').then(m => m.MenuComponent),
  canActivate: [authGuard] // ✅ Descomentar
}
```

#### Dashboard de Admin:
```typescript
{
  path: 'admin/dashboard',
  loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
  canActivate: [authGuard, roleGuard], // ✅ Descomentar
  data: { roles: ['ADMIN'] }           // ✅ Descomentar
}
```

---

## 📋 Configuración Completa con Seguridad

Aquí está el código completo con seguridad activada:

```typescript
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  // Rutas de Autenticación
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
  { path: 'auth', redirectTo: '/auth/login', pathMatch: 'full' },

  // Rutas Protegidas
  {
    path: 'menu',
    loadComponent: () => import('./components/menu/menu.component').then(m => m.MenuComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    redirectTo: '/menu',
    pathMatch: 'full'
  },

  // Rutas de Administración
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },

  // Rutas de Error
  {
    path: 'unauthorized',
    loadComponent: () => import('./components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
```

---

## 🎯 Comportamiento con Seguridad Activada

### Usuario No Autenticado:
- ❌ No puede acceder a `/menu`
- ❌ No puede acceder a `/admin/dashboard`
- ✅ Solo puede acceder a `/auth/login` y `/auth/register`

### Usuario Autenticado como USER:
- ✅ Puede acceder a `/menu`
- ❌ No puede acceder a `/admin/dashboard` (redirige a `/unauthorized`)
- ❌ No puede acceder a `/auth/login` (redirige a `/menu`)

### Usuario Autenticado como ADMIN:
- ✅ Puede acceder a `/menu`
- ✅ Puede acceder a `/admin/dashboard`
- ❌ No puede acceder a `/auth/login` (redirige a `/admin/dashboard`)

---

## 💡 Recomendación

**Para Desarrollo**: Mantén la seguridad desactivada para poder visualizar y probar todas las vistas fácilmente.

**Para Producción**: Asegúrate de reactivar todos los guards antes de desplegar la aplicación.

---

## ✅ Estado Actual

```
🔓 MODO DESARROLLO - Sin Protección
✅ Todas las rutas son accesibles
✅ No se requiere autenticación
✅ Ideal para desarrollo y testing de UI
```
