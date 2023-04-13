import {inject, Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, EMPTY, Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {Logout} from "../state/auth-state/auth-state.actions";
import {LocalStorageService} from "../services/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private localStorageService = inject(LocalStorageService);
  private store = inject(Store);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.localStorageService.getJwt();
    let request = req;
    if (jwt) {
      request = req.clone({setHeaders: {'Authorization': `Bearer ${jwt}`}});
    }

    return next.handle(request).pipe(catchError(error => this.handleAuthError(error)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      return this.store.dispatch(new Logout());
    }

    return EMPTY;
  }
}
