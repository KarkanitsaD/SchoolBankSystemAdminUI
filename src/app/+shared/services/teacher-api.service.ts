import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {TeacherModel} from "../models/teacher.model";
import {TeacherFilterModel} from "../models/teacher-filter.model";
import { RegisterModel } from "../models/register.model";

@Injectable()
export class TeacherApiService {
  private readonly baseUrl = `${environment.api_url}/teacher`;

  constructor(private apiService: ApiService) {
  }

  getTeacherList(filter: TeacherFilterModel): Observable<TeacherModel[]> {
    return this.apiService.post<TeacherModel[]>(`${this.baseUrl}/search`, filter);
  }

  addTeacher(registerModel: RegisterModel): Observable<any> {
    return this.apiService.post<any>(`${environment.api_url}/auth/register/teacher`, registerModel);
  }

  updateTeacher(model: TeacherModel): Observable<any> {
    return this.apiService.put<any>(this.baseUrl, model);
  }

  deleteTeacher(id: string): Observable<any> {
    return this.apiService.delete<any>(`${this.baseUrl}/${id}`);
  }
}
