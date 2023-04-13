import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from "../services/local-storage.service";
import {Store} from "@ngxs/store";
import {Authenticate, Logout} from "../state/auth-state/auth-state.actions";

@Injectable()
export class AuthGuard implements CanActivate {
  private localStorageService = inject(LocalStorageService);

  private store = inject(Store);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {
    const jwt = this.localStorageService.getJwt();
    if (jwt) {
      return this.store.dispatch(new Authenticate(jwt));
    } else {
      this.store.dispatch(new Logout());
      return false;
    }
  }
}
