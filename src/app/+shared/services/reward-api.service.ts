import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {RewardFilterModel} from "../models/reward-filter.model";
import {RewardModel} from "../models/reward.model";

@Injectable()
export class RewardApiService {
  private readonly baseUrl = `${environment.api_url}/reward`;

  constructor(private apiService: ApiService) {
  }

  getRewardList(filter: RewardFilterModel): Observable<RewardModel[]> {
    return this.apiService.post<RewardModel[]>(`${this.baseUrl}/search`, filter);
  }

  addReward(reward: RewardModel): Observable<RewardModel> {
    return this.apiService.post<RewardModel>(`${this.baseUrl}`, reward);
  }

  updateReward(reward: RewardModel): Observable<RewardModel> {
    return this.apiService.put<RewardModel>(`${this.baseUrl}`, reward);
  }

  deleteReward(id: string): Observable<any> {
    return this.apiService.delete<any>(`${this.baseUrl}/${id}`);
  }
}
