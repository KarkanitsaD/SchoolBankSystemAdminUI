import { CertificatePurchaseModel } from "./certificate-purchase.model";
import { ClassModel } from "./class.model";
import { MoneyTransferModel } from "./money-transfer.model";
import { StudentRewardModel } from "./student-reward.model";

export class StudentModel {
  id: string;
  name: string;
  surname: string;
  phone: string;
  sum: number;
  classId: string;
  imageId: string;
  imageBase64: string;
  imageExtension: string;
  class: ClassModel;
  certificatePurchases: CertificatePurchaseModel[];
  moneyTransfersFromStudent: MoneyTransferModel[];
  moneyTransfersToStudent: MoneyTransferModel[];
  moneyTransfers: MoneyTransferModel[];
  studentRewards: StudentRewardModel[];

  public constructor(init?: Partial<StudentModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
