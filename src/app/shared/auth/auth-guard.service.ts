import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

  pageList: any;
  constructor(@Inject(PLATFORM_ID) private _platformId: Object, private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   if(isPlatformBrowser(this._platformId)) {
    return this.authService.isAuthenticatedGuard()
   } else if(isPlatformServer(this._platformId)) {
     return true;
   }
  }
}
