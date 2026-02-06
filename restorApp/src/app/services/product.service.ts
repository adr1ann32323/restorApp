import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los productos activos (para USER)
   */
  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?is_active=true`);
  }

  /**
   * Obtener todos los productos (para ADMIN)
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  /**
   * Obtener producto por ID
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  /**
   * Crear producto (ADMIN)
   */
  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  /**
   * Actualizar producto (ADMIN)
   */
  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  /**
   * Desactivar producto (ADMIN)
   */
  deactivateProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`);
  }
}
