import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product, CreateProductRequest, UpdateProductRequest } from '../models/product.model';
import { environment } from '../../environments/environment';

/**
 * Servicio para manejar productos
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los productos activos (USER)
   */
  getProducts(): Observable<Product[]> {
    // IMPORTANTE: Cuando tengas el backend real, descomenta esta línea:
    // return this.http.get<Product[]>(`${this.apiUrl}${environment.endpoints.products}`);

    // Por ahora, devolvemos productos de ejemplo
    return of(this.getMockProducts());
  }

  /**
   * Obtener producto por ID
   */
  getProductById(id: number): Observable<Product> {
    // IMPORTANTE: Cuando tengas el backend real, descomenta esta línea:
    // return this.http.get<Product>(`${this.apiUrl}${environment.endpoints.products}/${id}`);

    const products = this.getMockProducts();
    const product = products.find(p => p.id === id);
    return of(product!);
  }

  /**
   * Crear producto (solo ADMIN)
   */
  createProduct(product: CreateProductRequest): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}${environment.endpoints.createProduct}`, product);
  }

  /**
   * Actualizar producto (solo ADMIN)
   */
  updateProduct(id: number, product: UpdateProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}${environment.endpoints.products}/${id}`, product);
  }

  /**
   * Desactivar producto (solo ADMIN)
   */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${environment.endpoints.products}/${id}`);
  }

  /**
   * Productos de ejemplo (simulación sin backend)
   * ELIMINA ESTE MÉTODO cuando tengas el backend real
   */
  private getMockProducts(): Product[] {
    return [
      {
        id: 1,
        name: 'Classic Beef Burger',
        description: 'Premium beef patty with cheddar cheese, lettuce, tomato, and our special sauce.',
        price: 8.99,
        stock: 50,
        is_active: true,
        category: 'BURGERS',
        link_image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop'
      },
      {
        id: 2,
        name: 'Double Bacon Melt',
        description: 'Two patties, crispy bacon, melted swiss cheese, and caramelized onions.',
        price: 12.50,
        stock: 30,
        is_active: true,
        category: 'BURGERS',
        link_image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=500&fit=crop'
      },
      {
        id: 3,
        name: 'Golden Fries',
        description: 'Freshly cut potatoes fried to perfection with sea salt.',
        price: 3.99,
        stock: 100,
        is_active: true,
        category: 'SIDES',
        link_image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=500&fit=crop'
      },
      {
        id: 4,
        name: 'Cola Zero',
        description: 'Chilled zero sugar cola with ice and a slice of lemon.',
        price: 2.50,
        stock: 80,
        is_active: true,
        category: 'DRINKS',
        link_image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=500&h=500&fit=crop'
      },
      {
        id: 5,
        name: 'Donut Box',
        description: 'Assorted glazed and frosted donuts.',
        price: 6.00,
        stock: 25,
        is_active: true,
        category: 'DESSERTS',
        link_image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=500&fit=crop'
      },
      {
        id: 6,
        name: 'Pepperoni Slice',
        description: 'Large NY style slice with double pepperoni.',
        price: 4.50,
        stock: 40,
        is_active: true,
        category: 'PIZZA',
        link_image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=500&fit=crop'
      }
    ];
  }
}
