/**
 * Modelo de Pedido según la guía
 */

export interface Order {
  id?: number;
  user_id: number;
  status: OrderStatus;
  total: number;
  created_at?: string;
}

/**
 * Estados del pedido según la guía
 */
export type OrderStatus = 'PENDING' | 'PREPARING' | 'DELIVERED' | 'CANCELLED';

/**
 * Detalle de pedido (OrderItem)
 */
export interface OrderItem {
  id?: number;
  order_id?: number;
  product_id: number;
  quantity: number;
  price: number; // Precio histórico del producto
  product?: any; // Información del producto (opcional)
}

/**
 * Request para crear un pedido
 */
export interface CreateOrderRequest {
  items: {
    product_id: number;
    quantity: number;
  }[];
}

/**
 * Item del carrito (frontend)
 */
export interface CartItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  link_image: string;
  notes?: string; // Notas especiales (ej: "No onions", "Extra salt")
}
