// src/app/core/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenService } from '../../services/TokenService';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if user is logged in
    if (!this.tokenService.isLoggedIn()) {
      this.router.navigate(['/seconnecter']);
      return false;
    }
    
    // Check if route requires admin role
    const requiresAdmin = route.data['requiresAdmin'] === true;
    
    if (requiresAdmin && !this.tokenService.isAdmin()) {
      // User is not an admin but trying to access admin page
      this.router.navigate(['/userInterface']);
      return false;
    }
    
    return true;
  }
}
