import { CertificateModel } from "../../models/certificate.model";

export interface CertificateStateModel {
    certificates: CertificateModel[];
    certificate: CertificateModel
}