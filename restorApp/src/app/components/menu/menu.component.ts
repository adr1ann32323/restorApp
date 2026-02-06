import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product, ProductCategory } from '../../models/product.model';
import { CartItem } from '../../models/order.model';

/**
 * Componente del Menú principal
 * Muestra los productos y permite filtrar por categoría
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  // Productos obtenidos de la API
  products = signal<Product[]>([]);

  // Categoría seleccionada
  selectedCategory = signal<ProductCategory>('ALL');

  // Texto de búsqueda
  searchText = signal('');

  // Items del carrito
  cartItems = signal<CartItem[]>([]);

  // Loading state
  loading = signal(false);

  // Productos filtrados (computed signal)
  filteredProducts = computed(() => {
    let filtered = this.products();

    // Filtrar por categoría
    if (this.selectedCategory() !== 'ALL') {
      filtered = filtered.filter(p => p.category === this.selectedCategory());
    }

    // Filtrar por búsqueda
    const search = this.searchText().toLowerCase();
    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    return filtered;
  });

  // Total del carrito (computed)
  cartTotal = computed(() => {
    const subtotal = this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    return subtotal + tax;
  });

  // Cantidad de items en el carrito
  cartItemCount = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  /**
   * Cargar productos desde el servicio
   */
  loadProducts(): void {
    this.loading.set(true);
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.loading.set(false);
      }
    });
  }

  /**
   * Cargar carrito desde el servicio
   */
  loadCart(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems.set(items);
    });
  }

  /**
   * Cambiar categoría seleccionada
   */
  selectCategory(category: ProductCategory): void {
    this.selectedCategory.set(category);
  }

  /**
   * Actualizar texto de búsqueda
   */
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText.set(input.value);
  }

  /**
   * Agregar producto al carrito
   */
  addToCart(product: Product): void {
    const cartItem: CartItem = {
      product_id: product.id!,
      product_name: product.name,
      price: product.price,
      quantity: 1,
      link_image: product.link_image
    };

    this.cartService.addToCart(cartItem);
  }

  /**
   * Actualizar cantidad de un item en el carrito
   */
  updateQuantity(productId: number, change: number): void {
    const item = this.cartItems().find(i => i.product_id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + change);
    }
  }

  /**
   * Remover item del carrito
   */
  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  /**
   * Limpiar todo el carrito
   */
  clearCart(): void {
    this.cartService.clearCart();
  }

  /**
   * Confirmar pedido
   */
  confirmOrder(): void {
    // Aquí irá la lógica para crear el pedido
    console.log('Confirmar pedido:', this.cartItems());
    // TODO: Implementar cuando tengamos el servicio de orders
    // this.router.navigate(['/orders']);
  }

  /**
   * Ir a Mis Pedidos
   */
  goToMyOrders(): void {
    this.router.navigate(['/orders']);
  }

  /**
   * Ir a Perfil
   */
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
