// Modelos de Order según la guía del gist

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  is_active: boolean;
  created_at?: string;
}

export interface Order {
  id: number;
  user_id: number;
  status: OrderStatus;
  total: number;
  created_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number; // Precio histórico del producto
  product?: Product;
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'DELIVERED' | 'CANCELLED';

export interface CreateOrderRequest {
  items: {
    product_id: number;
    quantity: number;
  }[];
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

// Para estadísticas del dashboard
export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  todayOrders: number;
  todayRevenue: number;
}

// Para filtros
export interface OrderFilters {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
}
