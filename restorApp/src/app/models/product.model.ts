/**
 * Modelo de Producto según la guía
 * Incluye todos los campos de la base de datos
 */

export interface Product {
  id?: number; // Opcional porque al crear no lo tenemos
  name: string;
  description: string;
  price: number;
  stock: number;
  is_active: boolean;
  link_image: string; // URL de la imagen del producto
  category?: string; // Categoría opcional (BURGERS, SIDES, DRINKS, DESSERTS, PIZZA)
  created_at?: string;
}

/**
 * Categorías de productos para los filtros
 */
export type ProductCategory = 'ALL' | 'BURGERS' | 'SIDES' | 'DRINKS' | 'DESSERTS' | 'PIZZA';

/**
 * Request para crear un producto (solo ADMIN)
 */
export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  is_active: boolean;
  link_image: string;
  category?: string;
}

/**
 * Request para actualizar un producto (solo ADMIN)
 */
export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  is_active?: boolean;
  link_image?: string;
  category?: string;
}
