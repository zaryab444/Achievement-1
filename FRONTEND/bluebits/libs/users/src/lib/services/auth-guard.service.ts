import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LocalstorageService } from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private route: Router, private localStorageToken: LocalstorageService){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();
    if(token){
      return true;
    }
    this.route.navigate(['/login']);
    return false


  }
}
