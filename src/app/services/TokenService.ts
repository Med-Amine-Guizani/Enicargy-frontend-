import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { default as jwt_decode } from 'jwt-decode';

export interface JwtPayload {
  id: number;
  role: string;
  sub: string; 
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  
  private userIdSubject = new BehaviorSubject<number | null>(null);
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  private readonly TOKEN_KEY = 'token';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.updateUserData();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.clearUser();
  }

  private updateUserData(): void {
    const decoded = this.getDecodedToken();
    if (decoded) {
      this.userIdSubject.next(decoded.id);
      this.userRoleSubject.next(decoded.role);
    }
  }

  getDecodedToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      // Manual JWT decoding
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('JWT must have 3 parts');
      }
      
      const payload = parts[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      console.log(JSON.parse(jsonPayload) as JwtPayload);
      return JSON.parse(jsonPayload) as JwtPayload;
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }
  
  getUserId(): string | null {
    const decoded = this.getDecodedToken();
    return decoded?.sub ?? null;
  }

  public isAdmin(): boolean {
    const decoded = this.getDecodedToken();
    return decoded?.role === 'ADMIN';
  }

  isLoggedIn(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded?.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  }

  private clearUser(): void {
    this.userIdSubject.next(null);
    this.userRoleSubject.next(null);
  }
}