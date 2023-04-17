import {Component, OnInit} from "@angular/core";
import {Store} from "@ngxs/store";
import {FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {LoginModel} from "../+shared/models/login.model";
import {Login} from "../+shared/state/auth-state/auth-state.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      phone: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required)
    });
  }

  onLogin(): void {
    const loginModel = this.loginForm.getRawValue() as LoginModel;
    this.store.dispatch(new Login(loginModel));
  }
}
