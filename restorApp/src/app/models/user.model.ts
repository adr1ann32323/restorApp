// Modelo de Usuario según la guía
export interface User {
  id?: number; // Opcional porque al registrar no lo tenemos
  name: string;
  email: string;
  password?: string; // Opcional porque nunca deberíamos recibirla del servidor
  role: 'USER' | 'ADMIN'; // Solo estos dos valores
  created_at?: string;
  updated_at?: string;
}

// Respuesta del login/registro desde el backend
export interface AuthResponse {
  token: string; // JWT que recibiremos del backend
  user: User; // Información del usuario
}

// Datos para hacer login
export interface LoginRequest {
  email: string;
  password: string;
}

// Datos para hacer registro
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN'; // Opcional, por defecto USER
}

// Información decodificada del token JWT
export interface TokenPayload {
  id: number;
  email: string;
  role: 'USER' | 'ADMIN';
  exp: number; // Fecha de expiración del token
}
