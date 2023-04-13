export class RewardModel {
  id: string;
  description: string;
  sum: number;

  constructor(init?: Partial<RewardModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
