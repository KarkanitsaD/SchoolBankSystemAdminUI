import { CertificatePurchaseModel } from "./certificate-purchase.model";
import { MoneyTransferModel } from "./money-transfer.model";
import { StudentRewardModel } from "./student-reward.model";

export class StudentModel {
  id: string;
  name: string;
  surname: string;
  phone: string;
  sum: number;
  certificatePurchases: CertificatePurchaseModel[];
  moneyTransfersFromStudent: MoneyTransferModel[];
  moneyTransfersToStudent: MoneyTransferModel[];
  studentRewards: StudentRewardModel[];

  public constructor(init?: Partial<StudentModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
