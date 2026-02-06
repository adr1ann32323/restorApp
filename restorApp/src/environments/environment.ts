/**
 * Configuración de URLs de la API
 *
 * IMPORTANTE: Cuando tengas el backend real, cambia estas URLs
 *
 * Ejemplo:
 * - Desarrollo local: http://localhost:3000/api
 * - Producción: https://tu-dominio.com/api
 */

export const environment = {
  production: false,
  apiUrl: 'https://jsonplaceholder.typicode.com', // API falsa para pruebas

  // Endpoints según la guía
  endpoints: {
    // Autenticación
    login: '/auth/login',          // POST - Iniciar sesión
    register: '/auth/register',    // POST - Registrar usuario

    // Productos
    products: '/products',         // GET - Listar productos (USER ve solo activos)
    productById: '/products/:id',  // GET - Obtener producto por ID
    createProduct: '/products',    // POST - Crear producto (solo ADMIN)
    updateProduct: '/products/:id', // PUT - Actualizar producto (solo ADMIN)
    deleteProduct: '/products/:id', // DELETE - Desactivar producto (solo ADMIN)

    // Pedidos
    orders: '/orders',             // GET - Mis pedidos (USER) o todos (ADMIN)
    orderById: '/orders/:id',      // GET - Detalle de pedido
    createOrder: '/orders',        // POST - Crear pedido (USER)
    updateOrderStatus: '/orders/:id/status', // PUT - Cambiar estado (ADMIN)
    cancelOrder: '/orders/:id/cancel' // PUT - Cancelar pedido (USER si PENDING)
  }
};

/**
 * Configuración para producción
 */
export const environmentProd = {
  production: true,
  apiUrl: 'https://tu-dominio.com/api', // Cambiar por tu URL de producción
  endpoints: environment.endpoints
};
