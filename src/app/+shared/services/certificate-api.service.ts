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

  getCertificateList(filter: CertificateFilterModel): Observable<CertificateModel[]> {
    return this.apiService.post<CertificateModel[]>(`${this.baseUrl}/search`, filter);
  }

  addCertificate(model: CertificateModel): Observable<CertificateModel> {
    return this.apiService.post<CertificateModel>(this.baseUrl, model);
  }

  updateCertificate(model: CertificateModel): Observable<CertificateModel> {
    return this.apiService.put<CertificateModel>(this.baseUrl, model);
  }

  deleteCertificate(id: string): Observable<any> {
    return this.apiService.delete<any>(`${this.baseUrl}/${id}`);
  }
}
