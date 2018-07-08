import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, protected authService: AuthService) {}

  canActivate() {
    if (tokenNotExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
