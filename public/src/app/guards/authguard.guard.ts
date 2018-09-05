import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserserviceService } from '../_service/userservice.service';

@Injectable()
export class AuthguardGuard implements CanActivate {

  constructor(private user:UserserviceService,private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   // return this.user.getUserLogin();

    if( this.user.getUserLogin()){

      return this.user.getUserLogin();

    }
    else{
      this.router.navigate(['/']);
      //window.location.replace(window.location.origin);
      return false;
    }
  }
}
