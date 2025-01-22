import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthServiceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Verifica si el usuario está logueado
    if (this.authService.isAuthenticated()) {
      return true;  // Permite el acceso a la ruta
    } else {
      // Redirige al usuario a la página de login si no está autenticado
      this.router.navigate(['/login']);
      return false;  // Bloquea el acceso a la ruta
    }
  }
}