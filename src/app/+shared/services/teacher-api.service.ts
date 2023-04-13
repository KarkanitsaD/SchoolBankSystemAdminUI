import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {TeacherModel} from "../models/teacher.model";
import {TeacherFilterModel} from "../models/teacher-filter.model";

@Injectable()
export class TeacherApiService {
  private readonly baseUrl = `${environment.api_url}/teacher`;

  constructor(private apiService: ApiService) {
  }

  getTeacherList(filter: TeacherFilterModel): Observable<TeacherModel[]> {
    return this.apiService.post<TeacherModel[]>(`${this.baseUrl}/search`, filter);
  }
}
