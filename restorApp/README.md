# 🍕 RestorApp - Sistema de Gestión de Pedidos

Sistema completo de gestión de pedidos para restaurantes con panel de administración profesional.

![Angular](https://img.shields.io/badge/Angular-21.1.1-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)

## 🚀 Características Principales

### ✅ Implementado

- **Autenticación Completa**
  - Sistema de Login y Registro
  - JWT Token Management
  - Guards de protección de rutas (Auth, Role, NoAuth)
  - Almacenamiento seguro en localStorage

- **Dashboard de Administración** 🎨
  - 📊 **Estadísticas en Tiempo Real**
    - Total de órdenes del día
    - Órdenes pendientes
    - Ingresos generados
  - 📋 **Gestión de Órdenes**
    - Lista con búsqueda y filtros
    - Detalles completos de cada orden
    - Actualización de estados (PENDING → PREPARING → DELIVERED)
    - Información de cliente y productos
  - 🎨 **Diseño Profesional**
    - Colores personalizados (#E45B1B, #EB8454, #EE966D)
    - Responsive (móvil, tablet, desktop)
    - Animaciones suaves
    - Iconos SVG optimizados

- **Servicios y Modelos**
  - AuthService, OrderService, ProductService
  - Modelos tipados con TypeScript
  - Observables con RxJS
  - Manejo de estados con BehaviorSubject

### 📁 Estructura del Proyecto

```
src/app/
├── components/
│   ├── auth/               # Login y Registro
│   ├── admin/
│   │   ├── navbar/         # Navegación admin
│   │   └── dashboard/      # Dashboard principal ✨
│   └── unauthorized/       # Página 403
├── guards/                 # Protección de rutas
│   ├── auth.guard.ts
│   ├── role.guard.ts
│   └── no-auth.guard.ts
├── models/                 # Interfaces TypeScript
│   ├── user.model.ts
│   └── order.model.ts
├── services/               # Lógica de negocio
│   ├── auth.service.ts
│   ├── order.service.ts
│   └── product.service.ts
└── app.routes.ts           # Configuración de rutas
```

## 🛠️ Instalación y Uso

### Desarrollo (Sin Backend)

El proyecto incluye datos de prueba para desarrollo sin backend:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Abrir navegador en:
http://localhost:4200/admin/dashboard
```

### Con Backend Real

1. **Configurar URL del Backend**

Edita `src/environments/environment.ts`:

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api' // Tu URL aquí
};
```

2. **Endpoints Requeridos**

```
GET    /api/orders              # Lista de órdenes
GET    /api/orders/:id          # Detalle de orden
PUT    /api/orders/:id/status   # Actualizar estado
POST   /api/auth/login          # Login
POST   /api/auth/register       # Registro
```

## 🎨 Diseño

### Colores del Sistema

```css
Primary:   #E45B1B  /* Naranja principal */
Secondary: #EB8454  /* Naranja medio */
Light:     #EE966D  /* Naranja claro */
```

### Responsive Breakpoints

- **Desktop:** > 1024px - Vista completa con 2 columnas
- **Tablet:** 768px - 1024px - Layout adaptado
- **Móvil:** < 768px - Vista de una columna

## 🔐 Sistema de Autenticación

### Roles Implementados

- **ADMIN:** Acceso completo al dashboard y gestión
- **USER:** Acceso a vista de cliente (próximamente)

### Guards Activos

```typescript
// Rutas protegidas
/admin/dashboard    → AuthGuard + RoleGuard(ADMIN)
/admin/orders       → AuthGuard + RoleGuard(ADMIN)

// Rutas públicas
/auth/login         → NoAuthGuard (redirige si ya está logueado)
/auth/register      → NoAuthGuard
```

## 📊 Estados de Órdenes

```
PENDING (Pendiente - Amarillo)
   ↓
PREPARING (En Preparación - Azul)
   ↓
DELIVERED (Entregada - Verde)

En cualquier momento:
   ↓
CANCELLED (Cancelada - Rojo)
```

## 📚 Documentación

- **[INSTRUCCIONES_COMPLETAS.md](./INSTRUCCIONES_COMPLETAS.md)** - Guía completa de uso
- **[DASHBOARD_README.md](./DASHBOARD_README.md)** - Detalles del dashboard
- **[CONFIGURACION.md](./CONFIGURACION.md)** - Configuración inicial del proyecto

## 🧪 Testing

```bash
# Tests unitarios
ng test

# E2E tests
ng e2e
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## 🏗️ Build

Para compilar el proyecto para producción:

```bash
ng build
```

Los archivos compilados se guardarán en `dist/`.

## 🎯 Próximos Pasos

### Pendientes de Implementación

- [ ] **Interceptors**
  - AuthInterceptor (agregar token automáticamente)
  - ErrorInterceptor (manejo centralizado de errores)
  - LoadingInterceptor (spinner global)

- [ ] **Componentes Adicionales**
  - Gestión de Productos (CRUD)
  - Gestión de Usuarios
  - Vista de Cliente (crear pedidos)
  - Carrito de compras

- [ ] **Mejoras**
  - Notificaciones toast
  - Exportar órdenes (PDF/Excel)
  - Gráficos de estadísticas
  - Filtros avanzados

## 🐛 Troubleshooting

### No puedo acceder al dashboard
- Verifica que tengas rol ADMIN en el token
- Temporalmente comenta los guards en `app.routes.ts`

### No se ven las órdenes
- Verifica la URL del backend en `environment.ts`
- Los datos mock se cargan automáticamente si falla el backend
- Revisa la consola del navegador para errores

### Error 403 Forbidden
- Tu usuario debe tener rol ADMIN
- Verifica que el token sea válido
- Revisa la configuración de guards

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es parte de un ejercicio académico.

## 👥 Autores

- **Equipo RestorApp** - Desarrollo frontend
- **Backend Team** - API REST

## 🙏 Agradecimientos

- Guía de desarrollo: [Gist de referencia](https://gist.github.com/Janner-GP/0dabba49478a152113a0729a2ec6e7f4)
- Angular CLI
- Tailwind CSS
- Comunidad de Angular

---

**🎉 ¡Dashboard Admin completamente funcional y listo para usar!**

Para más información, consulta los archivos de documentación:
- `INSTRUCCIONES_COMPLETAS.md` - Guía completa
- `DASHBOARD_README.md` - Detalles del dashboard
- `CONFIGURACION.md` - Configuración inicial
