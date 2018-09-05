import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserserviceService } from '../_service/userservice.service';

@Injectable()
export class PageGuardGuard implements CanActivate {

  constructor(private user:UserserviceService,private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   /*
      if(this.user.menteeormentor=true){
        this.router.navigate(['/mdashboard']);
        return false;
      }
      else{
        return true;
      }*/
      return true;
  }
}
