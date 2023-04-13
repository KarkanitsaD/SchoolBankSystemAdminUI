import {Action, Selector, State, StateContext} from "@ngxs/store";
import {AuthStateModel} from "./auth-state.model";
import {TeacherModel} from "../../models/teacher.model";
import {Authenticate, Login, Logout} from "./auth-state.actions";
import {AuthApiService} from "../../services/auth-api.service";
import {inject} from "@angular/core";
import {tap} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    teacher: null,
    jwt: null
  }
})
export class AuthState {
  private apiService = inject(AuthApiService);

  private localStorageService = inject(LocalStorageService);

  @Selector()
  static teacher(state: AuthStateModel): TeacherModel {
    return state.teacher;
  }

  @Selector()
  static jwt(state: AuthStateModel): string {
    return state.jwt;
  }

  @Selector()
  static isAuthorized(state: AuthStateModel): boolean {
    return !!state.teacher;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.apiService.login(action.loginModel)
      .pipe(tap(authModel => {
        ctx.setState({
          teacher: authModel.teacher,
          jwt: authModel.jwt
        });
        this.localStorageService.login(authModel);
      }));
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      teacher: null,
      jwt: null
    });
    this.localStorageService.logout();
  }

  @Action(Authenticate)
  authenticate(ctx: StateContext<AuthStateModel>, action: Authenticate) {
    return this.apiService.authenticate(action.jwt)
      .pipe(tap(authModel => {
        ctx.setState({
          teacher: authModel.teacher,
          jwt: authModel.jwt
        });
        this.localStorageService.login(authModel);
      }));
  }
}
