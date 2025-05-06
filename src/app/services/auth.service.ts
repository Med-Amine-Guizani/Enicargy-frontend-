import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './TokenService';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


interface LoginResponse {
  accessToken: string;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
  role:string;
}

const AUTH_API = 'http://localhost:9090/api/v1/auth';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${AUTH_API}/login`, { email, password }).pipe(
      tap(response => {
        // Store the token on successful login
        this.tokenService.setToken(response.accessToken);
        if (this.tokenService.isAdmin()) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/userInterface']);
        }
      })
    );
  }
  

  register(userData: RegisterData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${AUTH_API}/register`, userData).pipe(
      tap(response => { 
        if (response.accessToken) {
          console.log(response.accessToken);
          this.tokenService.setToken(response.accessToken);
          this.router.navigate(['/userInterface']);
        }
      })
    );
  }
  
  logout(): void {
    // Clear the token
    this.tokenService.clearToken();
    // Redirect to login page or home page
    this.router.navigate(['/seconnecter']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.tokenService.isAdmin();
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToSeConnecter(): void {
    this.router.navigate(['/seconnecter']);
  }
}
