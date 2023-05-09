import { CertificateModel } from "./certificate.model";

export class CertificatePurchaseModel {
    id: string;
    time: number;
    activatedTime: number;
    price: number;
    studentId: string;
    studentName: string;
    studentSurname: string;
    certificateId: string;
    certificate: CertificateModel

    public constructor(init?: Partial<CertificatePurchaseModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}