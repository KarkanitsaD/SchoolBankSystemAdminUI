import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {ApiService} from "./api.service";
import {StudentFilterModel} from "../models/student-filter.model";
import {Observable} from "rxjs";
import {StudentModel} from "../models/student.model";
import { RegisterModel } from "../models/register.model";

@Injectable()
export class StudentApiService {
  private readonly baseUrl = `${environment.api_url}/student`;

  constructor(private apiService: ApiService) {
  }

  getStudentList(filter: StudentFilterModel): Observable<StudentModel[]> {
    return this.apiService.post<StudentModel[]>(`${this.baseUrl}/search`, filter);
  }

  updateStudent(model: StudentModel): Observable<any> {
    return this.apiService.put<any>(this.baseUrl, model);
  }

  deleteStudent(id: string): Observable<any> {
    return this.apiService.delete<any>(`${this.baseUrl}/${id}`);
  }

  addStudent(registerModel: RegisterModel): Observable<any> {
    return this.apiService.post<any>(`${environment.api_url}/auth/register/student`, registerModel);
  }

  getStudent(id: string): Observable<StudentModel> {
    return this.apiService.get<StudentModel>(`${environment.api_url}/student/${id}`);
  }
}
