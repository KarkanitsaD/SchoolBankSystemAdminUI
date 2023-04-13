import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {LoginComponent} from "./login/login.component";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {NgxsModule} from "@ngxs/store";
import {AuthState} from "./+shared/state/auth-state/auth.state";
import {AuthApiService} from "./+shared/services/auth-api.service";
import {ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "./+shared/services/api.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {HttpHeadersInterceptor} from "./+shared/interceptors/http-headers.interceptor";
import {LocalStorageService} from "./+shared/services/local-storage.service";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {MatTableModule} from "@angular/material/table";
import {StudentModule} from "./modules/student/student.module";
import {StudentApiService} from "./+shared/services/student-api.service";
import {StudentState} from "./+shared/state/student-state/student.state";
import {AuthGuard} from "./+shared/guards/auth.guard";
import {AuthInterceptor} from "./+shared/interceptors/auth.interceptor";
import {TeacherState} from "./+shared/state/teacher-state/teacher.state";
import {TeacherApiService} from "./+shared/services/teacher-api.service";
import {RewardApiService} from "./+shared/services/reward-api.service";
import {CertificateApiService} from "./+shared/services/certificate-api.service";
import {RewardState} from "./+shared/state/reward-state/reward.state";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState, StudentState, TeacherState, RewardState]),
    NgxsRouterPluginModule.forRoot(),
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    StudentModule
  ],
  providers: [
    ApiService,
    AuthApiService,
    LocalStorageService,
    StudentApiService,
    TeacherApiService,
    RewardApiService,
    CertificateApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
