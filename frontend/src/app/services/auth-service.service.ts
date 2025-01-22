import { Injectable } from '@angular/core';
import axios from 'axios';
import { from } from 'rxjs';
import { Login, Register } from '../commands/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor() {}

  login(data: Login) {
    return from(axios.post(`${this.baseUrl}/login`, data));
  }

  register(data: Register) {
    return from(axios.post(`${this.baseUrl}/register`, data));
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('auth_token');
    }
    // return from(axios.post(`${this.baseUrl}/logout`));
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('auth_token', token);
    }
  }

  // Método para obtener el token
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth_token');
    }
    return null
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
