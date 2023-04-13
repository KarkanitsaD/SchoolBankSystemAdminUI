export class LoginModel {
  phone: string;
  password: string;

  public constructor(init?: Partial<LoginModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
