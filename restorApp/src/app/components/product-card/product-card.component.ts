import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

/**
 * Componente reutilizable para mostrar una tarjeta de producto
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product; // Producto a mostrar
  @Output() addToOrder = new EventEmitter<Product>(); // Evento cuando se agrega al carrito

  /**
   * Manejar click en "Add to order"
   */
  onAddToOrder(): void {
    this.addToOrder.emit(this.product);
  }

  /**
   * Obtener clase de color según la categoría
   */
  getCategoryClass(): string {
    const categoryClasses: { [key: string]: string } = {
      'BURGERS': 'bg-gray-900 text-white',
      'SIDES': 'bg-white text-gray-900 border border-gray-200',
      'DRINKS': 'bg-amber-100 text-amber-900',
      'DESSERTS': 'bg-gray-900 text-white',
      'PIZZA': 'bg-pink-100 text-pink-900'
    };
    return categoryClasses[this.product.category || ''] || 'bg-gray-100 text-gray-900';
  }

  /**
   * Obtener el color de fondo de la tarjeta según la categoría
   */
  getCardBackgroundClass(): string {
    const bgClasses: { [key: string]: string } = {
      'BURGERS': 'bg-gray-900',
      'SIDES': 'bg-white',
      'DRINKS': 'bg-amber-50',
      'DESSERTS': 'bg-gray-900',
      'PIZZA': 'bg-pink-50'
    };
    return bgClasses[this.product.category || ''] || 'bg-white';
  }

  /**
   * Verificar si el texto debe ser claro
   */
  hasLightText(): boolean {
    return this.product.category === 'BURGERS' || this.product.category === 'DESSERTS';
  }
}
