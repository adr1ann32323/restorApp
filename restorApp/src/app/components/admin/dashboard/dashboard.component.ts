import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { Order, OrderStatus, OrderStats } from '../../../models/order.model';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedOrder: Order | null = null;
  stats: OrderStats = {
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    todayOrders: 0,
    todayRevenue: 0
  };

  // Filtros
  selectedStatus: OrderStatus | 'ALL' = 'ALL';
  searchTerm: string = '';

  // Estados disponibles
  statusOptions: { value: OrderStatus | 'ALL', label: string, color: string }[] = [
    { value: 'ALL', label: 'Todas', color: '#6B7280' },
    { value: 'PENDING', label: 'Pendientes', color: '#F59E0B' },
    { value: 'PREPARING', label: 'En Preparación', color: '#3B82F6' },
    { value: 'DELIVERED', label: 'Entregadas', color: '#10B981' },
    { value: 'CANCELLED', label: 'Canceladas', color: '#EF4444' }
  ];

  // Estado de carga
  loading = false;
  updatingStatus = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadStats();

    // Suscribirse a cambios en las órdenes
    this.orderService.orders$.subscribe(orders => {
      this.orders = orders;
      this.applyFilters();
    });

    // Suscribirse a la orden seleccionada
    this.orderService.selectedOrder$.subscribe(order => {
      this.selectedOrder = order;
    });
  }

  /**
   * Cargar todas las órdenes
   */
  loadOrders(): void {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar órdenes:', error);
        this.loading = false;
        // Simular datos para desarrollo
        this.loadMockOrders();
      }
    });
  }

  /**
   * Cargar estadísticas
   */
  loadStats(): void {
    this.orderService.getOrderStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error al cargar estadísticas:', error);
      }
    });
  }

  /**
   * Aplicar filtros a las órdenes
   */
  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      // Filtro por estado
      const statusMatch = this.selectedStatus === 'ALL' || order.status === this.selectedStatus;

      // Filtro por búsqueda (ID, usuario, total)
      const searchMatch = !this.searchTerm ||
        (order.id && order.id.toString().includes(this.searchTerm)) ||
        (order.user?.name && order.user.name.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (order.user?.email && order.user.email.toLowerCase().includes(this.searchTerm.toLowerCase()));

      return statusMatch && searchMatch;
    });
  }

  /**
   * Cambiar filtro de estado
   */
  onStatusFilterChange(status: OrderStatus | 'ALL'): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  /**
   * Buscar órdenes
   */
  onSearch(): void {
    this.applyFilters();
  }

  /**
   * Seleccionar una orden
   */
  selectOrder(order: Order): void {
    if (!order.id) {
      console.error('La orden no tiene ID');
      return;
    }
    this.loading = true;
    this.orderService.getOrderById(order.id).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar detalle de orden:', error);
        this.loading = false;
        // En modo desarrollo, simular datos
        this.orderService.selectOrder(order);
      }
    });
  }

  /**
   * Actualizar estado de la orden seleccionada
   */
  updateOrderStatus(newStatus: OrderStatus): void {
    if (!this.selectedOrder || !this.selectedOrder.id) return;

    this.updatingStatus = true;
    this.orderService.updateOrderStatus(this.selectedOrder.id, newStatus).subscribe({
      next: () => {
        this.updatingStatus = false;
        this.loadStats(); // Recargar estadísticas
      },
      error: (error) => {
        console.error('Error al actualizar estado:', error);
        this.updatingStatus = false;
        alert('Error al actualizar el estado de la orden');
      }
    });
  }

  /**
   * Obtener clase CSS según el estado
   */
  getStatusClass(status: OrderStatus): string {
    const classes: Record<OrderStatus, string> = {
      'PENDING': 'status-pending',
      'PREPARING': 'status-preparing',
      'DELIVERED': 'status-delivered',
      'CANCELLED': 'status-cancelled'
    };
    return classes[status] || '';
  }

  /**
   * Obtener label del estado
   */
  getStatusLabel(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
      'PENDING': 'Pendiente',
      'PREPARING': 'En Preparación',
      'DELIVERED': 'Entregada',
      'CANCELLED': 'Cancelada'
    };
    return labels[status] || status;
  }

  /**
   * Formatear fecha
   */
  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Fecha no disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Formatear moneda
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  /**
   * Obtener cantidad de órdenes por estado
   */
  getOrderCountByStatus(status: OrderStatus | 'ALL'): number {
    if (status === 'ALL') {
      return this.orders.length;
    }
    return this.orders.filter(order => order.status === status).length;
  }

  /**
   * Datos de prueba para desarrollo
   */
  private loadMockOrders(): void {
    const mockOrders: Order[] = [
      {
        id: 1,
        user_id: 1,
        status: 'PENDING',
        total: 45.50,
        created_at: new Date().toISOString(),
        user: { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
        items: [
          { id: 1, order_id: 1, product_id: 1, quantity: 2, price: 12.50, product_name: 'Pizza Margarita', product: { id: 1, name: 'Pizza Margarita' } },
          { id: 2, order_id: 1, product_id: 2, quantity: 1, price: 20.50, product_name: 'Pasta Carbonara', product: { id: 2, name: 'Pasta Carbonara' } }
        ]
      },
      {
        id: 2,
        user_id: 2,
        status: 'PREPARING',
        total: 32.00,
        created_at: new Date(Date.now() - 3600000).toISOString(),
        user: { id: 2, name: 'María García', email: 'maria@example.com' },
        items: [
          { id: 3, order_id: 2, product_id: 3, quantity: 1, price: 32.00, product_name: 'Hamburguesa Especial', product: { id: 3, name: 'Hamburguesa Especial' } }
        ]
      },
      {
        id: 3,
        user_id: 3,
        status: 'DELIVERED',
        total: 78.90,
        created_at: new Date(Date.now() - 7200000).toISOString(),
        user: { id: 3, name: 'Carlos López', email: 'carlos@example.com' },
        items: [
          { id: 4, order_id: 3, product_id: 1, quantity: 3, price: 12.50, product_name: 'Pizza Margarita', product: { id: 1, name: 'Pizza Margarita' } },
          { id: 5, order_id: 3, product_id: 4, quantity: 2, price: 21.45, product_name: 'Ensalada César', product: { id: 4, name: 'Ensalada César' } }
        ]
      }
    ];

    this.orders = mockOrders;
    this.applyFilters();

    // Calcular stats manualmente
    this.stats = {
      totalOrders: mockOrders.length,
      pendingOrders: mockOrders.filter(o => o.status === 'PENDING').length,
      totalRevenue: mockOrders.filter(o => o.status === 'DELIVERED').reduce((sum, o) => sum + o.total, 0),
      todayOrders: mockOrders.length,
      todayRevenue: mockOrders.filter(o => o.status === 'DELIVERED').reduce((sum, o) => sum + o.total, 0)
    };
  }
}
