export class RewardFilterModel {
  description: string;
  maxSum: number;
  minSum: string;

  public constructor(init?: Partial<RewardFilterModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
