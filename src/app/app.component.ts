import {Component, OnInit} from '@angular/core';
import {Actions, ofActionSuccessful, Store} from "@ngxs/store";
import {Observable, Subscription} from "rxjs";
import {AuthState} from "./+shared/state/auth-state/auth.state";
import {Login, Logout} from "./+shared/state/auth-state/auth-state.actions";
import {ObserverComponent} from "./+shared/components/observer/observer.component";
import {Navigate} from "@ngxs/router-plugin";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ObserverComponent implements OnInit {
  title = 'school-bank-system-admin-ui';

  isAuthorized$: Observable<boolean>;

  constructor(
    private store: Store,
    private actions$: Actions
  ) {
    super();
  }

  ngOnInit(): void {
    this.isAuthorized$ = this.store.select(AuthState.isAuthorized);
    this.loginSubscription();
    this.logoutSubscription();
  }

  onLogout(): void {
    this.store.dispatch(new Logout());
  }

  private loginSubscription(): Subscription {
    return this.actions$.pipe(ofActionSuccessful(Login)).subscribe(() => {
      this.store.dispatch(new Navigate(['students']));
    });
  }

  private logoutSubscription(): Subscription {
    return this.actions$.pipe(ofActionSuccessful(Logout)).subscribe(() => {
      this.store.dispatch(new Navigate(['login']));
    });
  }
}
