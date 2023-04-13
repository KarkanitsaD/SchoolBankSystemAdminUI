import {Injectable} from "@angular/core";
import {AuthTeacherModel} from "../models/auth-teacher.model";
import {TeacherModel} from "../models/teacher.model";

@Injectable()
export class LocalStorageService {
  login(authModel: AuthTeacherModel): void {
    localStorage.setItem('jwt', authModel.jwt);
    localStorage.setItem('teacher', JSON.stringify(authModel.teacher));
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('teacher');
  }

  getJwt(): string {
    return localStorage.getItem('jwt');
  }

  getTeacher(): TeacherModel {
    const json = localStorage.getItem('teacher');
    return JSON.parse(json) as TeacherModel;
  }
}
