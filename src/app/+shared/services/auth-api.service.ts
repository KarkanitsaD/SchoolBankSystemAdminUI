import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AuthTeacherModel} from "../models/auth-teacher.model";
import {LoginModel} from "../models/login.model";
import {Authenticate} from "../state/auth-state/auth-state.actions";

@Injectable()
export class AuthApiService {
  private readonly baseUrl = `${environment.api_url}/auth`;

  constructor(private apiService: ApiService) {
  }

  login(loginModel: LoginModel): Observable<AuthTeacherModel> {
    return this.apiService.post<AuthTeacherModel>(`${this.baseUrl}/login/teacher`, loginModel);
  }

  authenticate(jwt: string): Observable<AuthTeacherModel> {
    return this.apiService.post<AuthTeacherModel>(`${this.baseUrl}/authenticate/teacher`, jwt);
  }
}
