import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {CertificateFilterModel} from "../models/certificate-filter.model";
import {CertificateModel} from "../models/certificate.model";

@Injectable()
export class CertificateApiService {
  private readonly baseUrl = `${environment.api_url}/certificate`;

  constructor(private apiService: ApiService) {
  }

  getStudentList(filter: CertificateFilterModel): Observable<CertificateModel[]> {
    return this.apiService.post<CertificateModel[]>(`${this.baseUrl}/search`, filter);
  }
}
