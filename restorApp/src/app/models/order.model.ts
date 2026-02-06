/**
 * Estados posibles de un pedido según la guía
 */
export type OrderStatus = 'PENDING' | 'PREPARING' | 'DELIVERED' | 'CANCELLED';

/**
 * Información del usuario en un pedido (simplificada)
 */
export interface OrderUser {
  id: number;
  name: string;
  email: string;
}

/**
 * Modelo de Pedido según la guía
 */
export interface Order {
  id?: number; // Opcional porque al crear no lo tenemos
  user_id: number;
  user?: OrderUser; // Información del usuario que hizo el pedido
  status: OrderStatus;
  total: number;
  created_at?: string;
  items?: OrderItem[]; // Los detalles del pedido
}

/**
 * Información simplificada del producto en un item
 */
export interface OrderProduct {
  id: number;
  name: string;
  link_image?: string;
}

/**
 * Detalle de un pedido
 */
export interface OrderItem {
  id?: number;
  order_id?: number;
  product_id: number;
  quantity: number;
  price: number; // Precio histórico del producto
  product_name?: string; // Nombre del producto (para mostrar)
  product?: OrderProduct; // Información completa del producto
}

/**
 * Request para crear un pedido (USER)
 */
export interface CreateOrderRequest {
  items: {
    product_id: number;
    quantity: number;
  }[];
}

/**
 * Request para actualizar estado de pedido (ADMIN)
 */
export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

/**
 * Filtros para listar pedidos
 */
export interface OrderFilters {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
}

/**
 * Estadísticas para el dashboard (ADMIN)
 */
export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  todayOrders: number;
  todayRevenue: number;
}

/**
 * Item del carrito de compras (usado en cart.service)
 */
export interface CartItem {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  link_image?: string; // URL de la imagen del producto
  notes?: string; // Notas especiales del cliente para este item
}

