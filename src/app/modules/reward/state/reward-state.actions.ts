import { RewardModel } from "../../../+shared/models/reward.model";
import { RewardFilterModel } from "../../../+shared/models/reward-filter.model";

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