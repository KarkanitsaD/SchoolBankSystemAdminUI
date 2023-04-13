import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {ApiService} from "./api.service";
import {StudentFilterModel} from "../models/student-filter.model";
import {Observable} from "rxjs";
import {StudentModel} from "../models/student.model";

@Injectable()
export class StudentApiService {
  private readonly baseUrl = `${environment.api_url}/student`;

  constructor(private apiService: ApiService) {
  }

  getStudentList(filter: StudentFilterModel): Observable<StudentModel[]> {
    return this.apiService.post<StudentModel[]>(`${this.baseUrl}/search`, filter);
  }
}
