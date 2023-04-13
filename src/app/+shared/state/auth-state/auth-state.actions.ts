import {LoginModel} from "../../models/login.model";

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public loginModel: LoginModel) {
  }
}

export class Authenticate {
  static readonly type = '[Auth] Authenticate';

  constructor(public jwt: string) {
  }
}

export class LoginFailed {
  static readonly type = '[Auth] Login failed';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
