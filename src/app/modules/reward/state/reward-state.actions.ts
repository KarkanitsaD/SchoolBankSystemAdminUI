import { RewardModel } from "../../../+shared/models/reward.model";
import { RewardFilterModel } from "../../../+shared/models/reward-filter.model";

export class LoadRewards {
  static readonly type = '[Reward] Search rewards';

  constructor(public filterModel: RewardFilterModel) {}
}

export class ClearRewards {
  static readonly type = '[Reward] Clear rewards';
}

export class AddReward {
  static readonly type = '[Reward] Add reward';

  constructor(public reward: RewardModel) {}
}

export class UpdateReward {
  static readonly type = '[Reward] update reward';

  constructor(public reward: RewardModel) {}
}

export class DeleteReward {
  static readonly type = '[Reward] delete reward';

  constructor(public id: string) {}
}