import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  Order, 
  CreateOrderRequest, 
  UpdateOrderStatusRequest, 
  OrderStats,
  OrderFilters,
  OrderStatus 
} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;
  
  // Subject para actualizar la lista de órdenes en tiempo real
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  // Subject para la orden seleccionada
  private selectedOrderSubject = new BehaviorSubject<Order | null>(null);
  public selectedOrder$ = this.selectedOrderSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las órdenes (ADMIN) o mis órdenes (USER)
   */
  getOrders(filters?: OrderFilters): Observable<Order[]> {
    let params = new HttpParams();
    
    if (filters?.status) {
      params = params.set('status', filters.status);
    }
    if (filters?.startDate) {
      params = params.set('startDate', filters.startDate);
    }
    if (filters?.endDate) {
      params = params.set('endDate', filters.endDate);
    }

    return this.http.get<Order[]>(`${this.apiUrl}/orders`, { params })
      .pipe(
        tap(orders => this.ordersSubject.next(orders))
      );
  }

  /**
   * Obtener detalle de una orden específica
   */
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`)
      .pipe(
        tap(order => this.selectedOrderSubject.next(order))
      );
  }

  /**
   * Crear nuevo pedido (USER)
   */
  createOrder(orderData: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, orderData);
  }

  /**
   * Actualizar estado de orden (ADMIN)
   */
  updateOrderStatus(orderId: number, status: OrderStatus): Observable<Order> {
    const data: UpdateOrderStatusRequest = { status };
    return this.http.put<Order>(`${this.apiUrl}/orders/${orderId}/status`, data)
      .pipe(
        tap(updatedOrder => {
          // Actualizamos la orden seleccionada
          this.selectedOrderSubject.next(updatedOrder);
          
          // Actualizamos la lista de órdenes
          const currentOrders = this.ordersSubject.value;
          const updatedOrders = currentOrders.map(order => 
            order.id === orderId ? updatedOrder : order
          );
          this.ordersSubject.next(updatedOrders);
        })
      );
  }

  /**
   * Cancelar pedido (USER - solo si está PENDING)
   */
  cancelOrder(orderId: number): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/orders/${orderId}/cancel`, {})
      .pipe(
        tap(updatedOrder => {
          this.selectedOrderSubject.next(updatedOrder);
          
          const currentOrders = this.ordersSubject.value;
          const updatedOrders = currentOrders.map(order => 
            order.id === orderId ? updatedOrder : order
          );
          this.ordersSubject.next(updatedOrders);
        })
      );
  }

  /**
   * Obtener estadísticas del dashboard (ADMIN)
   */
  getOrderStats(): Observable<OrderStats> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`).pipe(
      map(orders => this.calculateStats(orders))
    );
  }

  /**
   * Calcular estadísticas localmente
   */
  private calculateStats(orders: Order[]): OrderStats {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.created_at);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    });

    const pendingOrders = orders.filter(order => order.status === 'PENDING');
    const deliveredOrders = orders.filter(order => order.status === 'DELIVERED');
    
    const todayRevenue = todayOrders
      .filter(order => order.status === 'DELIVERED')
      .reduce((sum, order) => sum + order.total, 0);

    const totalRevenue = deliveredOrders.reduce((sum, order) => sum + order.total, 0);

    return {
      totalOrders: orders.length,
      pendingOrders: pendingOrders.length,
      totalRevenue: totalRevenue,
      todayOrders: todayOrders.length,
      todayRevenue: todayRevenue
    };
  }

  /**
   * Seleccionar una orden
   */
  selectOrder(order: Order | null): void {
    this.selectedOrderSubject.next(order);
  }

  /**
   * Limpiar orden seleccionada
   */
  clearSelectedOrder(): void {
    this.selectedOrderSubject.next(null);
  }
}
