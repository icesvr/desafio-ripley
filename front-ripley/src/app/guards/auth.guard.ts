import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from './../services/login.service';
import { take, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  datos:any; 
  constructor(private loginService:LoginService, private router:Router, private afsAuth: AngularFireAuth){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        if (!auth) {
          this.router.navigate(['/login']);
        }
      }));
  
  
}
}

