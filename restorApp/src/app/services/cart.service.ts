import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/order.model';

/**
 * Servicio para manejar el carrito de compras
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Cargar carrito desde localStorage al iniciar
    this.loadCartFromStorage();
  }

  /**
   * Obtener items del carrito
   */
  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  /**
   * Agregar producto al carrito
   */
  addToCart(item: CartItem): void {
    const currentCart = this.cartItems.value;
    const existingItem = currentCart.find(i => i.product_id === item.product_id);

    if (existingItem) {
      // Si ya existe, incrementar cantidad
      existingItem.quantity += item.quantity;
    } else {
      // Si no existe, agregar nuevo
      currentCart.push(item);
    }

    this.cartItems.next([...currentCart]);
    this.saveCartToStorage();
  }

  /**
   * Actualizar cantidad de un producto
   */
  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this.cartItems.value;
    const item = currentCart.find(i => i.product_id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.cartItems.next([...currentCart]);
        this.saveCartToStorage();
      }
    }
  }

  /**
   * Remover producto del carrito
   */
  removeFromCart(productId: number): void {
    const currentCart = this.cartItems.value.filter(i => i.product_id !== productId);
    this.cartItems.next(currentCart);
    this.saveCartToStorage();
  }

  /**
   * Limpiar carrito
   */
  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }

  /**
   * Calcular subtotal
   */
  getSubtotal(): number {
    return this.cartItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  /**
   * Calcular impuesto (8%)
   */
  getTax(): number {
    return this.getSubtotal() * 0.08;
  }

  /**
   * Calcular total
   */
  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  /**
   * Obtener cantidad de items en el carrito
   */
  getItemCount(): number {
    return this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Guardar carrito en localStorage
   */
  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }

  /**
   * Cargar carrito desde localStorage
   */
  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        this.cartItems.next(cart);
      } catch (error) {
        console.error('Error al cargar carrito:', error);
      }
    }
  }
}
