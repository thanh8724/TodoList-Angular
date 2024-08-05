import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.severce';

@Injectable({
  providedIn: 'root'
})
export class IsLogin implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = sessionStorage.getItem('jwt');
    if (token) {
        const role = sessionStorage.getItem('role');
        let result;
        if(role) {
            result = true;
        }else {
            this.router.navigate(['/login'])
            result = false;
        }
        return result;
    } else {
        this.router.navigate(['/login']);
        return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class IsLeader implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = sessionStorage.getItem('jwt');
    if (token) {
        const role = sessionStorage.getItem('role');
        let result;
        if(role == "1") {
            result = true;
        }else {
            alert("Tài khoản Leader mới có thể truy cập!");
            this.router.navigate(['/personnels'])
            result = false;
        }
        return result;
    } else {
        this.router.navigate(['/login']);
        return false;
    }
  }
}