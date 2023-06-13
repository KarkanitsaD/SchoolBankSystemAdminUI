import { environment } from "src/environments/environment";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { ClassModel } from "../models/class.model";
import { Injectable } from "@angular/core";

@Injectable()
export class ClassApiService {
    private readonly baseUrl = `${environment.api_url}/class`;

    constructor(private apiService: ApiService) {
    }

    getClassesList(): Observable<ClassModel[]> {
        return this.apiService.get(this.baseUrl);
    }

    updateClass(classModel: ClassModel): Observable<ClassModel> {
        return this.apiService.put(this.baseUrl, classModel);
    }

    deleteClass(id: string): Observable<any> {
        return this.apiService.delete(`${this.baseUrl}/${id}`);
    }

    addClass(classModel: ClassModel): Observable<ClassModel> {
        return this.apiService.post(this.baseUrl, classModel);
    }
}