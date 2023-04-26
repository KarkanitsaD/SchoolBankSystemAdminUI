import {Component, OnInit} from "@angular/core";
import { Actions, ofActionDispatched, Store } from "@ngxs/store";
import {FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {LoginModel} from "../+shared/models/login.model";
import { Login, LoginFailed } from "../+shared/state/auth-state/auth-state.actions";
import { ObserverComponent } from "../+shared/components/observer/observer.component";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ObserverComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(private store: Store, private actions: Actions) {
    super();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      phone: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required)
    });
    this.subscriptions.push(this.loginFailedSubscription());
  }

  onLogin(): void {
    const loginModel = this.loginForm.getRawValue() as LoginModel;
    this.store.dispatch(new Login(loginModel));
  }

  private loginFailedSubscription(): Subscription {
    return this.actions.pipe(ofActionDispatched(LoginFailed)).subscribe(() => {
      this.loginForm.controls['phone'].setValue('');
      this.loginForm.controls['password'].setValue('');
      this.loginForm.setErrors({ 'loginFailed' : true});
    });
  }
}
