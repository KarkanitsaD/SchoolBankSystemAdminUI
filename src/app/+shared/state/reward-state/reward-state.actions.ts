import {RewardFilterModel} from "../../models/reward-filter.model";

export class LoadRewards {
  static readonly type = '[Reward] Search';

  constructor(public filterModel: RewardFilterModel) {}
}
