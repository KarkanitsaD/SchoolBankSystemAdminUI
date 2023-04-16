import {RewardFilterModel} from "../../models/reward-filter.model";
import { RewardModel } from "../../models/reward.model";

export class LoadRewards {
  static readonly type = '[Reward] Search';

  constructor(public filterModel: RewardFilterModel) {}
}

export class AddReward {
  static readonly type = '[Reward] Add';

  constructor(public reward: RewardModel) {}
}

export class UpdateReward {
  static readonly type = '[Reward] update';

  constructor(public reward: RewardModel) {}
}

export class DeleteReward {
  static readonly type = '[Reward] delete';

  constructor(public id: string) {}
}